import clsx from 'clsx';
import Image from 'next/image';
import {ComponentPropsWithoutRef, useState} from 'react';

import { BcImage } from '~/components/bc-image';
import { Link as CustomLink } from '~/components/link';

import Badge from '../badge';

import Price, { ProductPrice } from './price';

// import Compare from '@/vibes/soul/components/product-card/compare'

interface Image {
  altText: string;
  src: string;
}
interface ReviewSummary {
  numberOfReviews: number;
  averageRating: number
}

export interface Product {
  id: string;
  name: string;
  href: string;
  image?: Image;
  price?: ProductPrice;
  basePrice?: any;
  subtitle?: string;
  badge?: string;
  className?: string;
  reviewSummary?: ReviewSummary;
  customFields?: {[propName: string]: any}
}

export const ProductCard = function ProductCard({
  id,
  name,
  href,
  image,
  price,
  basePrice,
  subtitle,
  badge,
  className,
  reviewSummary,
  customFields
}: Product & ComponentPropsWithoutRef<'a'>) {

    let productSubtitle = [];
    if(customFields) {
        customFields.forEach((item => {
            if(item.name === "productSubtitle") {
                productSubtitle.push(item.value);
            }
        }));
    }

    let calculateDiscountPrice = typeof  basePrice != "undefined" ? (basePrice.value - (basePrice.value / 10)).toFixed(2) : "";

  return (
      <div className="st_single-card--wrapper flex flex-col justify-between">
        <CustomLink
            className={clsx(
                'group flex cursor-pointer flex-col rounded-xl text-foreground ring-primary focus-visible:outline-0 focus-visible:ring-2 mb-[16px]',
                className,
            )}
            href={href}
            id={id}
        >
          <div
              className="st_collections-page-inner--wrapper relative overflow-hidden rounded-xl @6xl:min-w-80 flex justify-center">
            {badge && (
                <Badge className="absolute left-2.5 top-2.5 @4xl:left-4 @4xl:top-4">{badge}</Badge>
            )}
            {image && (
                <BcImage
                    alt="Category card image"
                    className="select-none bg-contrast-100 transition-transform duration-300 ease-in-out group-hover:scale-105 !w-[300px] !h-[200px] object-contain !bg-[#fff] !relative"
                    fill
                    sizes="(max-width: 768px) 70vw, 33vw"
                    src={image.src}
                />
            )}
            {/* {checked !== undefined && setChecked && (
          <Compare label="Compare" checked={checked} setChecked={setChecked} />
        )} */}
          </div>
            <h3 className="flex flex-col flex-wrap justify-between font-semibold text-[18px] mb-[6px]">
                {name && <span className="st_title line-clamp-2">{name}</span>}
                {basePrice && basePrice.value &&
                    <span>${(basePrice.value).toFixed(2)}</span>
                }
                {/*{subtitle &&
                    <span className="st_light-primary font-normal text-contrast-400 leading-[1.2]">{subtitle}</span>
                }*/}
            </h3>
            <div className="st_light-primary text-[16px]">{productSubtitle}</div>
        </CustomLink>
          <div>
              {basePrice && basePrice.value &&
                  <div className="rounded-[10px] w-full px-[24px] py-[12px] bg-[#dddae8] mb-[20px]">
                      <div className="text-[#522D72] text-[14px]">Price with Subscribe and Save: <span>${calculateDiscountPrice}</span></div>
                  </div>
              }
              <a className="bg-[#522D72] text-[#fff] text-center w-full block px-[24px] py-[12px] cursor-pointer rounded-[50px]"
                 href={href}>View Products</a>
              {/*{price && <Price price={price}/>}*/}
          </div>
      </div>
  );
};

interface ProductCardSkeletonProps {
    className?: string;
}

export const ProductCardSkeleton = function ProductCardSkeleton({
  className,
}: ProductCardSkeletonProps) {
  return (
    <div className={clsx('animate-pulse cursor-pointer rounded-xl', className)}>
      {/* Image */}
      <div className="relative aspect-[5/6] overflow-hidden rounded-xl bg-contrast-100 @6xl:min-w-80" />
      <div className="flex flex-col gap-2 @sm:gap-2">
        <h3 className="mt-4 flex flex-col flex-wrap justify-between gap-2 @sm:mt-7 @sm:gap-2 @4xl:flex-row">
          {/* Name */}
          <div className="h-4 w-24 rounded-lg bg-contrast-100" />
          {/* Subtitle */}
          <div className="h-4 w-20 rounded-lg bg-contrast-100" />
        </h3>
        {/* Price */}
        <div className="h-4 w-16 rounded-lg bg-contrast-100 @4xl:h-6" />
      </div>
    </div>
  );
};

export default ProductCard;
