import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Breadcrumbs } from '~/components/breadcrumbs';
import { ProductCard } from '~/components/product-card';
import { Pagination } from '~/components/ui/pagination';
import { LocaleType } from '~/i18n';

import { FacetedSearch } from '../../_components/faceted-search';
import { MobileSideNav } from '../../_components/mobile-side-nav';
import { SortBy } from '../../_components/sort-by';
import { fetchFacetedSearch } from '../../fetch-faceted-search';

import { CategoryViewed } from './_components/category-viewed';
import { SubCategories } from './_components/sub-categories';
import { getCategoryPageData } from './page-data';

interface Props {
  params: {
    slug: string;
    locale: LocaleType;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryId = Number(params.slug);

  const data = await getCategoryPageData({
    categoryId,
  });

  const category = data.category;

  if (!category) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = category.seo;

  return {
    title: pageTitle || category.name,
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
  };
}

export default async function Category({ params: { locale, slug }, searchParams }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Category' });
  const messages = await getMessages({ locale });

  const categoryId = Number(slug);

  const [{ category, categoryTree }, search] = await Promise.all([
    getCategoryPageData({ categoryId }),
    fetchFacetedSearch({ ...searchParams, category: categoryId }),
  ]);

  if (!category) {
    return notFound();
  }

  const productsCollection = search.products;
  const products = productsCollection.items;
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
      <div className="group max-w-[1520px] mx-auto">
        <Breadcrumbs category={category} />
        <NextIntlClientProvider
            locale={locale}
            messages={{
              FacetedGroup: messages.FacetedGroup ?? {},
              Product: messages.Product ?? {},
              AddToCart: messages.AddToCart ?? {},
            }}
        >
          <div className="md:mb-8 lg:flex lg:flex-row lg:items-center lg:justify-between mt-[3rem]">
            <h1 className="mb-4 text-4xl text-[#522d72] lg:mb-0 lg:text-5xl">{category.name}</h1>

            <div className="flex flex-col items-center gap-3 whitespace-nowrap md:flex-row">
              <MobileSideNav>
                <FacetedSearch
                    facets={search.facets.items}
                    headingId="mobile-filter-heading"
                    pageType="category"
                >
                  <SubCategories categoryTree={categoryTree} />
                </FacetedSearch>
              </MobileSideNav>
              <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-end md:gap-6">
                <SortBy />
                <div className="order-3 py-4 text-base font-semibold md:order-2 md:py-0">
                  {t('sortBy', { items: productsCollection.collectionInfo?.totalItems ?? 0 })}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <FacetedSearch
                className="mb-8 hidden lg:block"
                facets={search.facets.items}
                headingId="desktop-filter-heading"
                pageType="category"
            >
              <SubCategories categoryTree={categoryTree} />
            </FacetedSearch>

            <section
                aria-labelledby="product-heading"
                className="st_product-collection-primary--wrapper col-span-4 group-has-[[data-pending]]:animate-pulse lg:col-span-3"
            >
              <h2 className="sr-only" id="product-heading">
                {t('products')}
              </h2>

              <div className="st_product-collections-page--wrapper">
                {products.map((product, index) => (
                    <ProductCard
                        imagePriority={index <= 3}
                        imageSize="wide"
                        key={product.entityId}
                        product={product}
                    />
                ))}
              </div>

              <Pagination
                  endCursor={endCursor ?? undefined}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  startCursor={startCursor ?? undefined}
              />
            </section>
          </div>
        </NextIntlClientProvider>
        <CategoryViewed category={category} categoryId={categoryId} products={products} />
      </div>
  );
}

export const runtime = 'edge';
