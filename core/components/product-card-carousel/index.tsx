import { graphql, ResultOf } from '~/client/graphql';
import { Carousel } from '~/components/ui/carousel';

import { ProductCard, ProductCardFragment } from '../product-card';
import {CarouselRelated} from "~/components/ui/carousel-related";

export const ProductCardCarouselFragment = graphql(
  `
    fragment ProductCardCarouselFragment on Product {
      ...ProductCardFragment
    }
  `,
  [ProductCardFragment],
);

type Product = ResultOf<typeof ProductCardCarouselFragment>;

export const ProductCardCarousel = ({
  title,
  products,
  showCart,
  showCompare,
}: {
  title: string;
  products: Product[];
  showCart?: boolean;
  showCompare?: boolean;
}) => {
  if (products.length === 0) {
    return null;
  }
console.log("products card", products)
  const items = products.map((product) => (
    <ProductCard
      imageSize="tall"
      key={product.entityId}
      product={product}
      showCart={false}
      showCompare={false}
    />
  ));
  console.log("items card", items)

  return <CarouselRelated className="mb-14" products={items} title={title} />;
};
