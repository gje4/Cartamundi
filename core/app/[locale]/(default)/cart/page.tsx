import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { TAGS } from '~/client/tags';
import { LocaleType } from '~/i18n';

import { CartItem, CartItemFragment } from './_components/cart-item';
import { CartViewed } from './_components/cart-viewed';
import { CheckoutButton } from './_components/checkout-button';
import { CheckoutSummary, CheckoutSummaryFragment } from './_components/checkout-summary';
import { EmptyCart } from './_components/empty-cart';
import { GeographyFragment } from './_components/shipping-estimator/fragment';
import {ProductCardCarousel} from "~/components/product-card-carousel";
import {RelatedProducts} from "~/app/[locale]/(default)/product/[slug]/_components/related-products";
import {Suspense} from "react";

export const metadata = {
  title: 'Cart',
};

interface Props {
  params: {
    locale: LocaleType;
  };
}

const CartPageQuery = graphql(
  `
    query CartPageQuery($cartId: String) {
      site {
        cart(entityId: $cartId) {
          entityId
          currencyCode
          lineItems {
            ...CartItemFragment
          }
        }
        checkout(entityId: $cartId) {
          ...CheckoutSummaryFragment
        }
      }
      geography {
        ...GeographyFragment
      }
    }
  `,
  [CartItemFragment, CheckoutSummaryFragment, GeographyFragment],
);

export default async function CartPage({ params: { locale } }: Props) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return <EmptyCart locale={locale} />;
  }

  const messages = await getMessages({ locale });
  const Cart = messages.Cart ?? {};
  const t = await getTranslations({ locale, namespace: 'Cart' });

  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: CartPageQuery,
    variables: { cartId },
    customerId,
    fetchOptions: {
      cache: 'no-store',
      next: {
        tags: [TAGS.cart, TAGS.checkout],
      },
    },
  });

  const cart = data.site.cart;
  const checkout = data.site.checkout;
  const geography = data.geography;

  if (!cart) {
    return <EmptyCart locale={locale} />;
  }

  const lineItems = [...cart.lineItems.physicalItems, ...cart.lineItems.digitalItems];

  return (
    <div className="max-w-[1520px] w-full mx-auto mt-[3rem]">
      <h1 className="pb-6 pt-36 text-4xl text-[#522d72] lg:pb-10 lg:text-5xl">{t('heading')}</h1>
      <div className="pb-12 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <ul className="col-span-2">
          {lineItems.map((product) => (
            <CartItem currencyCode={cart.currencyCode} key={product.entityId} product={product} />
          ))}
        </ul>

        <div className="col-span-1 md:col-span-1 col-start-2 lg:col-start-3">
          {checkout && <CheckoutSummary checkout={checkout} geography={geography} />}

          <NextIntlClientProvider locale={locale} messages={{ Cart }}>
            <CheckoutButton cartId={cartId} />
          </NextIntlClientProvider>
        </div>
      </div>
      <CartViewed checkout={checkout} currencyCode={cart.currencyCode} lineItems={lineItems} />


          <Suspense fallback={t('loading')}>
        <RelatedProducts productId={117} />
      </Suspense>


    </div>

  );
}

export const runtime = 'edge';
