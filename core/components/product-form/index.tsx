'use client';

import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { AlertCircle, Check, Heart, ShoppingCart } from 'lucide-react';
import {useFormatter, useTranslations} from 'next-intl';
import { FormProvider, useFormContext } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { ProductItemFragment } from '~/client/fragments/product-item';
import { FragmentOf } from '~/client/graphql';
import { Button } from '~/components/ui/button';
import { bodl } from '~/lib/bodl';

import { AddToCartButton } from '../add-to-cart-button';
import { Link } from '../link';

import { handleAddToCart } from './_actions/add-to-cart';
import { CheckboxField } from './fields/checkbox-field';
import { DateField } from './fields/date-field';
import { MultiLineTextField } from './fields/multi-line-text-field';
import { MultipleChoiceField } from './fields/multiple-choice-field';
import { NumberField } from './fields/number-field';
import { QuantityField } from './fields/quantity-field';
import { TextField } from './fields/text-field';
import { ProductFormData, useProductForm } from './use-product-form';
import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface Props {
  data: FragmentOf<typeof ProductItemFragment>;
}

const productItemTransform = (p: FragmentOf<typeof ProductItemFragment>) => {
  const category = removeEdgesAndNodes(p.categories).at(0);
  const breadcrumbs = category ? removeEdgesAndNodes(category.breadcrumbs) : [];

  return {
    product_id: p.entityId.toString(),
    product_name: p.name,
    brand_name: p.brand?.name,
    sku: p.sku,
    sale_price: p.prices?.salePrice?.value,
    purchase_price: p.prices?.salePrice?.value || p.prices?.price.value || 0,
    base_price: p.prices?.price.value,
    retail_price: p.prices?.retailPrice?.value,
    currency: p.prices?.price.currencyCode || 'USD',
    category_names: breadcrumbs.map(({ name }) => name),
    variant_id: p.variants.edges?.map((variant) => variant.node.entityId),
  };
};

export const Submit = ({ data: product }: Props) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <AddToCartButton data={product} loading={isSubmitting}>
      <ShoppingCart className="mr-2" />
    </AddToCartButton>
  );
};

export const ProductForm = ({ data: product }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Product.Form');
  const m = useTranslations('AddToCart');
  const productOptions = removeEdgesAndNodes(product.productOptions);
  const productCustomFields = removeEdgesAndNodes(product.customFields)
  const { handleSubmit, register, ...methods } = useProductForm();
  const [PV, setPV] = React.useState<number>(0);
  const [SSPV, setSSPV] = React.useState<number>(0);

  //let basePrice = (product.prices!.basePrice!.value).toFixed(2);
  let basePrice = (product.prices!.price!.value).toFixed(2);
  let parseBasePrice = parseFloat(basePrice);
  let discountedPrice = (parseBasePrice - (parseBasePrice / 10)).toFixed(2);
  let discountedAmount = 0.25 * parseBasePrice;
  let biggerDiscountedPrice = (discountedAmount).toFixed(2);
  const [klarnaInstallment, setKlarnaInstallment] = React.useState(biggerDiscountedPrice);
  const format = useFormatter();
  const showPriceRange =
      product.prices?.priceRange.min.value !== product.prices?.priceRange.max.value;
  const productFormSubmit = async (data: ProductFormData) => {
    const result = await handleAddToCart(data, product);
    const quantity = Number(data.quantity);

    if (result.error) {
      toast.error(m('errorAddingProductToCart'), {
        icon: <AlertCircle className="text-error-secondary" />,
      });

      return;
    }

    const transformedProduct = productItemTransform(product);

    bodl.cart.productAdded({
      product_value: transformedProduct.purchase_price * quantity,
      currency: transformedProduct.currency,
      line_items: [
        {
          ...transformedProduct,
          quantity,
        },
      ],
    });

    toast.success(
      () => (
        <div className="flex items-center gap-3">
          <span>
            {m.rich('addedProductQuantity', {
              cartItems: quantity,
              cartLink: (chunks) => (
                <Link
                  className="font-semibold text-primary hover:text-secondary"
                  href="/cart"
                  prefetch="viewport"
                  prefetchKind="full"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </div>
      ),
      { icon: <Check className="text-success-secondary" /> },
    );
  };

  let defaultChecked = 0;
  if(searchParams) {
    let subscribeAndSavePreset = searchParams.get("sns");
    defaultChecked = subscribeAndSavePreset !== undefined && subscribeAndSavePreset !== null ? Number(subscribeAndSavePreset) : 0;
  }


  const [checked, setChecked] = useState<number>(defaultChecked);
  const [subscribeAndSaveBonusItemsOpen, setSubscribeAndSaveBonusItemsOpen] = useState(false);

  function toggleSubscribeAndSaveBonusItems(open:boolean) {
      setSubscribeAndSaveBonusItemsOpen(open);
      recalculateKlarna(open);
  }

  function inputCheck(index: number, prefetch:boolean = false) {
      setChecked(index);
      const optionSearchParams = new URLSearchParams(searchParams.toString());
      optionSearchParams.set("sns", String(index));
      const newUrl = `${pathname}?${optionSearchParams.toString()}`;
      if (prefetch) {
        router.prefetch(newUrl);
      } else {
        router.replace(newUrl, { scroll: false });
      }
      toggleSubscribeAndSaveBonusItems(index === 1);
  }

  useEffect(() => {
    inputCheck(checked);
  }, []);

  function recalculateKlarna(isSubscribeAndSave: boolean):void {
    let basePrice = (product.prices!.price!.value).toFixed(2);
    let parseBasePrice = parseFloat(basePrice);
    let discountedPrice = parseBasePrice * 0.9;
    let klarnaBasis = isSubscribeAndSave ? discountedPrice : parseBasePrice;
    let biggerDiscountedPrice = (0.25 * klarnaBasis).toFixed(2);
    setKlarnaInstallment(biggerDiscountedPrice);
  }

  function hasAtLeastOneSubscribe():boolean {
    let output = false;
    for(let i=0; i< productOptions.length; i++) {
      let option = productOptions[i];
      if (option.displayName.indexOf("---subscribe-only---") > -1) {
        output = true;
        break;
      }
    }
    return output;
  }
  function hasAtLeastOneBundleAndSave():boolean {
    let output = false;
    for(let i=0; i< productOptions.length; i++) {
      let option = productOptions[i];
      if (option.displayName.indexOf("---bundle-and-save---") > -1) {
        output = true;
        break;
      }
    }
    return output;
  }

  function productVolume() {
    for(let i=0; i<productCustomFields.length; i++) {
      let customField = productCustomFields[i];
      if(customField["name"] === "PV") {
        let PVFormatted = parseInt(customField["value"]);
        setPV(PVFormatted);
        setSSPV(Math.round(PVFormatted*0.9));
        break;
      }
    }
    return "";
  }

  function hasVolumes():boolean {
    return PV !== 0
  }

  useEffect(() => {
    productVolume();
  }, []);


  return (
    <FormProvider handleSubmit={handleSubmit} register={register} {...methods}>
      <form className="flex flex-col gap-6 @container" onSubmit={handleSubmit(productFormSubmit)}>
        <input type="hidden" value={product.entityId} {...register('product_id')} />

          {productOptions.map((option) => {
              if (option.__typename === 'MultipleChoiceOption') {
                return <MultipleChoiceField key={option.entityId} option={option} bundleAndSave={false} subscribeAndSave={false} />;
              }

              if (option.__typename === 'CheckboxOption') {
                return <CheckboxField key={option.entityId} option={option} />;
              }

              if (option.__typename === 'NumberFieldOption') {
                return <NumberField key={option.entityId} option={option} />;
              }

              if (option.__typename === 'MultiLineTextFieldOption') {
                return <MultiLineTextField key={option.entityId} option={option} />;
              }

              if (option.__typename === 'TextFieldOption') {
                return <TextField key={option.entityId} option={option} />;
              }

              if (option.__typename === 'DateFieldOption') {
                return <DateField key={option.entityId} option={option} />;
              }
            return null;
          })}

        {(hasAtLeastOneBundleAndSave() && (<div className="st_bundle-and-save-options">
          <div>
            <h2 className="st_sns_header">Bundle & Save!</h2>
            <h4 className="st_sns_subheader">This bundle offers additional products at a very high discount!</h4>
          </div>
          {productOptions.map((option) => {
            if (option.__typename === 'MultipleChoiceOption') {
              return <MultipleChoiceField key={option.entityId} option={option} bundleAndSave={true} subscribeAndSave={false} />;
            }
          })}
        </div>))
        }

        <div className="st_purchase_frequency">
          <div>
            <h2 className="st_sns_header">Purchase Frequency Options</h2>
            <h4 className="st_sns_subheader">Buy this product once or get it monthly with additional benefits!</h4>
          </div>
          <div className={`st_custom-radio-button mb-[20px]`}>
            <div>
              <label className={`st_radio-label_JS ${0 === checked ? 'bg-[#dddae8]' : ''}`} htmlFor="one_time_save">
                <input
                    className="st_radio-input_JS"
                    type="radio"
                    name="subscribe_and_save"
                    id="one_time_save"
                    checked={0 === checked}
                    onChange={() => inputCheck(0)}
                />
                <span className="st_circle"></span>
                <span>One-Time-Purchase</span>
                <span className="ml-auto st_price">{(hasVolumes() && (
                    <span className="st_volume">(PV: {PV})</span>))} ${basePrice}</span>
              </label>
            </div>
            <div>
              <label className={`st_radio-label_JS ${1 === checked ? 'bg-[#dddae8]' : ''}`} htmlFor="subscribe_save">
                <input
                    className="st_radio-input_JS"
                    type="radio"
                    name="subscribe_and_save"
                    id="subscribe_save"
                    checked={1 === checked}
                    onChange={() => inputCheck(1)}
                />
                <span className="st_circle"></span>
                <span className="flex flex-col">
                  <span>Subscribe & Save 10%</span>
                </span>
                <span className="ml-auto flex items-center gap-[6px]">
                  {(hasVolumes() && (<span className="st_volume">(PV: {SSPV})</span>))}
                  <span className="st_price line-through">${basePrice}</span>
                  <span className="st_price font-bold">${discountedPrice}</span>
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-[12px] border-t border-t-[#ffa8cd] px-[10px] py-[20px]">
            <div>
              <svg role="img" xmlns="http://www.w3.org/2000/svg" width="71.25" height="30"
                   viewBox="0 0 71.25 30" aria-label="Klarna" version="2.1">
                <g clip-path="url(#a)">
                  <path fill="#FFA8CD"
                        d="M62.7688 0H8.48123C3.79718 0 0 3.79718 0 8.48123V21.5188C0 26.2028 3.79718 30 8.48123 30H62.7688c4.684 0 8.4812-3.7972 8.4812-8.4812V8.48123C71.25 3.79718 67.4528 0 62.7688 0Z"></path>
                  <path fill="#0B051D"
                        d="M57.412 19.1418c-1.2436 0-2.2134-1.0286-2.2134-2.2776 0-1.2491.9698-2.2776 2.2134-2.2776 1.2441 0 2.2135 1.0285 2.2135 2.2776 0 1.249-.9694 2.2776-2.2135 2.2776Zm-.6215 2.4062c1.0608 0 2.4145-.4041 3.1645-1.9837l.0731.0367c-.329.8633-.329 1.3776-.329 1.5062v.202h2.6704v-8.8901h-2.6704v.2021c0 .1286 0 .6428.329 1.5061l-.0731.0368c-.75-1.5797-2.1037-1.9838-3.1645-1.9838-2.543 0-4.3355 2.0205-4.3355 4.6839 0 2.6633 1.7925 4.6838 4.3355 4.6838Zm-8.9822-9.3677c-1.2073 0-2.1586.4225-2.9268 1.9838l-.0732-.0368c.3292-.8633.3292-1.3775.3292-1.5061v-.2021h-2.6708v8.8901h2.744v-4.6838c0-1.2307.7134-2.0021 1.8659-2.0021 1.1526 0 1.7193.6612 1.7193 1.9837v4.7022H51.54v-5.6573c0-2.0205-1.5731-3.4716-3.7317-3.4716Zm-9.3112 1.9838-.0731-.0368c.3293-.8633.3293-1.3775.3293-1.5061v-.2021h-2.6708v8.8901h2.7439l.0183-4.2797c0-1.249.6586-2.0021 1.7379-2.0021.2926 0 .5305.0367.8048.1102v-2.7185c-1.2073-.2571-2.2866.2021-2.8903 1.745Zm-8.7257 4.9777c-1.244 0-2.2135-1.0286-2.2135-2.2776 0-1.2491.9695-2.2776 2.2135-2.2776 1.2439 0 2.2134 1.0285 2.2134 2.2776 0 1.249-.9695 2.2776-2.2134 2.2776Zm-.622 2.4062c1.061 0 2.4147-.4041 3.1647-1.9837l.0732.0367c-.3293.8633-.3293 1.3776-.3293 1.5062v.202h2.6708v-8.8901H32.058v.2021c0 .1286 0 .6428.3293 1.5061l-.0732.0368c-.75-1.5797-2.1037-1.9838-3.1647-1.9838-2.5428 0-4.3355 2.0205-4.3355 4.6839 0 2.6633 1.7927 4.6838 4.3355 4.6838Zm-8.1588-.2388h2.744V8.45166h-2.744V21.3092ZM18.9784 8.45166h-2.7988c0 2.29594-1.4086 4.35314-3.5489 5.82264l-.8415.5878V8.45166H8.88062V21.3092h2.90858v-6.3736l4.8111 6.3736h3.5489L15.521 15.211c2.1037-1.5245 3.4757-3.894 3.4574-6.75934Z"></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h71.25v30H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>4 Interest-Free Payments of <span>${klarnaInstallment}.</span></div>
          </div>
        </div>

        {/*<div className="st_subscribe-and-save">
          <label htmlFor={`subscribe_and_save`}>
            <input
                className="st_checkbox_JS"
                type="checkbox"
                id="subscribe_and_save"
                name="subscribe_and_save"
                checked={checked}
                onChange={toggleChecked}
            />
            <span className="st_check"></span>
            <span className="absolute block pl-[50px] w-max text-[12px] text-[black] lg:text-[14px]">Subscribe and save 10% (${discountedPrice})</span>
          </label>
        </div>*/}

        {(subscribeAndSaveBonusItemsOpen && hasAtLeastOneSubscribe() && (<div className="st_subscribe-and-save-options">
          <div>
            <h2 className="st_sns_header">Get Products at Discount With Subscribe & Save!</h2>
            <h4 className="st_sns_subheader">If you buy this bundle with a subscription active, you can include up to
              3 products at super discount!</h4>
          </div>
          {
            productOptions.map((option) => {
              if (option.__typename === 'MultipleChoiceOption') {
                return <div><MultipleChoiceField key={option.entityId} option={option} bundleAndSave={false} subscribeAndSave={true}/></div>;
              }
            })
          }
        </div>))
        }

        <div className="flex gap-[24px]">
          <QuantityField/>
          <div className="flex items-end gap-[6px]">
          </div>
          {/*{product.prices && (
              <div className="grid">
                <span className="mb-2 block font-semibold">Price</span>
                <div className="text-[24px] font-bold leading-[1.2] flex items-end">
                  {showPriceRange ? (
                      <span>
              {format.number(product.prices.priceRange.min.value, {
                style: 'currency',
                currency: product.prices.price.currencyCode,
              })}{' '}-{' '}
                        {format.number(product.prices.priceRange.max.value, {
                          style: 'currency',
                          currency: product.prices.price.currencyCode,
                        })}
            </span>
                  ) : (
                      <>
                        {product.prices.retailPrice?.value !== undefined && (
                            <span>
                  {t('Prices.msrp')}:{' '}
                              <span className="line-through">
                    {format.number(product.prices.retailPrice.value, {
                      style: 'currency',
                      currency: product.prices.price.currencyCode,
                    })}
                  </span>
                  <br/>
                </span>
                        )}
                        {product.prices.salePrice?.value !== undefined &&
                        product.prices.basePrice?.value !== undefined ? (
                            <>
                  <span>
                    {t('Prices.was')}:{' '}
                    <span className="line-through">
                      {format.number(product.prices.basePrice.value, {
                        style: 'currency',
                        currency: product.prices.price.currencyCode,
                      })}
                    </span>
                  </span>
                              <br/>
                              <span>
                    {t('Prices.now')}:{' '}
                                {format.number(product.prices.price.value, {
                                  style: 'currency',
                                  currency: product.prices.price.currencyCode,
                                })}
                    </span>
                            </>
                        ) : (
                            product.prices.price.value && (
                                <span>
                    {format.number(product.prices.price.value, {
                      style: 'currency',
                      currency: product.prices.price.currencyCode,
                    })}
                  </span>
                            )
                        )}
                      </>
                  )}
                </div>
              </div>
          )}*/}
        </div>

        <div className="st_equal-col mt-4 flex flex-col gap-4 @md:flex-row">
          <Submit data={product}/>

          {/* NOT IMPLEMENTED YET */}
          <div className="w-full">
            <Button disabled type="submit" variant="secondary">
              <Heart aria-hidden="true" className="mr-2"/>
              <span>{t('saveToWishlist')}</span>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
