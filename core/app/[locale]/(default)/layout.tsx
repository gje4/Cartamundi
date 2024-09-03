import { NextIntlClientProvider } from 'next-intl';

import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { PropsWithChildren, Suspense } from 'react';

import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { Footer, FooterFragment } from '~/components/footer';
import { Header, HeaderFragment } from '~/components/header';
import { ProductSheet } from '~/components/product-sheet';

import { LocaleType } from '~/i18n';

interface Props extends PropsWithChildren {
  params: { locale: LocaleType };
}

const LayoutQuery = graphql(
  `
    query LayoutQuery {
      site {
        ...HeaderFragment
        ...FooterFragment
      }
    }
  `,
  [HeaderFragment, FooterFragment],
);

export default async function DefaultLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const messages = await getMessages({ locale });


  return (
    <>
      <Header data={data.site} />

        <main className="flex-1 mt-22 2xl:container px-[20px] sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">

            {children}</main>

      <Suspense fallback={null}>
        <NextIntlClientProvider
            locale={locale}
            messages={{ Product: messages.Product ?? {}, AddToCart: messages.AddToCart ?? {} }}
        >
          <ProductSheet />
        </NextIntlClientProvider>
      </Suspense>

        <Footer data={data.site}/>
    </>
  );
}
