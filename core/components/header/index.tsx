import { getLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { FragmentOf, graphql } from '~/client/graphql';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { localeLanguageRegionMap } from '~/i18n';

import { Header as ComponentsHeader } from '../ui/header';
import {cookies} from "next/headers";
import {getChannelIdFromLocale} from "~/channels.config";
import {NextResponse} from "next/server";
import {useSearchParams } from 'next/navigation';
import { getCart } from '~/client/queries/get-cart';

export const StoreLogoFragment = graphql(`
  fragment StoreLogoFragment on Settings {
    storeName
    logoV2 {
      __typename
      ... on StoreTextLogo {
        text
      }
      ... on StoreImageLogo {
        image {
          url: urlTemplate
          altText
        }
      }
    }
  }
`);

export const HeaderFragment = graphql(
  `
    fragment HeaderFragment on Site {
      settings {
        storeName
        ...StoreLogoFragment
      }
      categoryTree {
        name
        path
        children {
          name
          path
          children {
            name
            path
          }
        }
      }
    }
  `,
  [StoreLogoFragment],
);

interface Props {
  data: FragmentOf<typeof HeaderFragment>;
}

export const Header = async ({ data }: Props) => {
  const customerId = await getSessionCustomerId();

  const locale = await getLocale();

  /**  To prevent the navigation menu from overflowing, we limit the number of categories to 6.
   To show a full list of categories, modify the `slice` method to remove the limit.
   Will require modification of navigation menu styles to accommodate the additional categories.
   */
  const categoryTree = data.categoryTree.slice(0, 6);

  const links = categoryTree.map(({ name, path, children }) => ({
    label: name,
    href: path,
    groups: children.map((firstChild) => ({
      label: firstChild.name,
      href: firstChild.path,
      links: firstChild.children.map((secondChild) => ({
        label: secondChild.name,
        href: secondChild.path,
      })),
    })),
  }));


  async function getCartCount() {
    "use client"
    const cartId = cookies().get('cartId')?.value;
    if (cartId) {
      const cart = await getCart(cartId, getChannelIdFromLocale(locale));
      return cart?.lineItems?.totalQuantity ?? 0;
    }

    return 0;
  }


  return (
    <ComponentsHeader
      accountHref={customerId ? '/account' : '/login'}
      activeLocale={locale}
      cartHref="/cart"
      cartCount={await getCartCount()}
      links={links}
      locales={localeLanguageRegionMap}
      logo={data.settings ? logoTransformer(data.settings) : undefined}
    />
  );
};
