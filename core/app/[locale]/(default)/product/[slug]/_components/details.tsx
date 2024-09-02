import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { useFormatter, useTranslations } from 'next-intl';

import { ProductItemFragment } from '~/client/fragments/product-item';
import { FragmentOf, graphql } from '~/client/graphql';
import { ProductForm } from '~/components/product-form';
import { ProductFormFragment } from '~/components/product-form/fragment';

import { ProductSchema, ProductSchemaFragment } from './product-schema';
import { ReviewSummary, ReviewSummaryFragment } from './review-summary';

export const DetailsFragment = graphql(
  `
    fragment DetailsFragment on Product {
      ...ReviewSummaryFragment
      ...ProductSchemaFragment
      ...ProductFormFragment
      ...ProductItemFragment
      entityId
      name
      description
      sku
      upc
      minPurchaseQuantity
      maxPurchaseQuantity
      condition
      weight {
        value
        unit
      }
      availabilityV2 {
        description
      }
      customFields {
        edges {
          node {
            entityId
            name
            value
          }
        }
      }
      brand {
        name
      }
      prices {
        priceRange {
          min {
            value
          }
          max {
            value
          }
        }
        retailPrice {
          value
        }
        salePrice {
          value
        }
        basePrice {
          value
        }
        price {
          value
          currencyCode
        }
      }
    }
  `,
  [ReviewSummaryFragment, ProductSchemaFragment, ProductFormFragment, ProductItemFragment],
);

interface Props {
  product: FragmentOf<typeof DetailsFragment>;
}

export const Details = ({ product }: Props) => {
  const t = useTranslations('Product.Details');
  const format = useFormatter();

  return (
      <div>
          {Boolean(product.sku) && (
              <div className="flex items-center gap-[6px] pb-[4px]">
                  <h3 className="font-normal">{t('sku')}:</h3>
                  <p>{product.sku}</p>
              </div>
          )}
          {/*{Boolean(product.weight) && (
              <div>
                  <h3 className="font-semibold">{t('weight')}</h3>
                  <p>
                      {product.weight?.value} {product.weight?.unit}
                  </p>
              </div>
          )}*/}

          <h1 className="st_title text-[30px] leading-[1.3]">{product.name}</h1>
          {product.brand && (
              <p className="font-semibold uppercase text-gray-500">{product.brand.name}</p>
          )}
          <ReviewSummary data={product}/>
          <div className="my-[10px]" dangerouslySetInnerHTML={{__html: product.description}}/>
          <ProductForm data={product}/>

          {/*<div className="my-12">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">{t('additionalDetails')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {Boolean(product.sku) && (
            <div>
              <h3 className="font-semibold">{t('sku')}</h3>
              <p>{product.sku}</p>
            </div>
          )}
          {Boolean(product.upc) && (
            <div>
              <h3 className="font-semibold">{t('upc')}</h3>
              <p>{product.upc}</p>
            </div>
          )}
          {Boolean(product.minPurchaseQuantity) && (
            <div>
              <h3 className="font-semibold">{t('minPurchase')}</h3>
              <p>{product.minPurchaseQuantity}</p>
            </div>
          )}
          {Boolean(product.maxPurchaseQuantity) && (
            <div>
              <h3 className="font-semibold">{t('maxPurchase')}</h3>
              <p>{product.maxPurchaseQuantity}</p>
            </div>
          )}
          {Boolean(product.availabilityV2.description) && (
            <div>
              <h3 className="font-semibold">{t('availability')}</h3>
              <p>{product.availabilityV2.description}</p>
            </div>
          )}
          {Boolean(product.condition) && (
            <div>
              <h3 className="font-semibold">{t('condition')}</h3>
              <p>{product.condition}</p>
            </div>
          )}
          {Boolean(product.weight) && (
            <div>
              <h3 className="font-semibold">{t('weight')}</h3>
              <p>
                {product.weight?.value} {product.weight?.unit}
              </p>
            </div>
          )}
          {Boolean(customFields) &&
            customFields.map((customField) => (
              <div key={customField.entityId}>
                <h3 className="font-semibold">{customField.name}</h3>
                <p>{customField.value}</p>
              </div>
            ))}
        </div>
      </div>*/}
          <ProductSchema product={product}/>
      </div>
  );
};
