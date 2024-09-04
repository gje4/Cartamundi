import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode } from 'react';

import { Link as CustomLink } from '~/components/link';

interface Image {
  src: string;
  altText: string;
}

interface Link {
  href: string;
  label: string;
}

interface Section {
  title?: string;
  links: Link[];
}

interface SocialMediaLink {
  href: string;
  icon: ReactNode;
}

interface ContactInformation {
  address?: string;
  phone?: string;
}

interface Props {
  logo?: string | Image;
  sections: Section[];
  copyright?: string;
  contactInformation?: ContactInformation;
  paymentIcons?: ReactNode[];
  socialMediaLinks?: SocialMediaLink[];
  className?: string;
}

export const Footer = function Footer({
  logo,
  sections,
  contactInformation,
  paymentIcons,
  socialMediaLinks,
  copyright,
  className = '',
}: Props) {

  console.log("logo", logo)
  return (
    <footer
      className={clsx(
        'border-b-[4px] border-b-primary bg-background text-foreground @container',
        className,
      )}
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col justify-between gap-10 border-t border-t-contrast-100 pt-16 @xl:py-20 @2xl:flex-row">
          <div className="flex flex-col @2xl:w-1/3">
            {/* Contact Information */}
            {contactInformation?.address || contactInformation?.phone ? (
                    <CustomLink
                        className="relative inline-block h-5 w-32 rounded-lg ring-primary focus-visible:outline-0 focus-visible:ring-2"
                        href="#"
                    >
                      {typeof logo === 'string' ? (
                          <span className="font-heading text-2xl font-semibold">{logo}</span>
                      ) : (
                          logo?.src && (
                              <Image
                                  alt={logo.altText ?? 'Logo'}
                                  className="object-contain"
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                                  src={logo.src}
                              />
                          )
                      )}
                    </CustomLink>


            ) : (
                // Logo

                <div className="text-[20px] font-medium @lg:text-2xl">
                  <h3 className="text-contrast-300">Contact Us</h3>
                  <div>
                    {contactInformation.address && <p>{contactInformation.address}</p>}
                    {contactInformation.phone && <p>{contactInformation.phone}</p>}
                  </div>
                </div>

            )}

            {/* Social Media Links */}
            {socialMediaLinks && (
                <div className="mt-auto flex items-center gap-4 pt-8">
                  {socialMediaLinks.map(({href, icon}, i) => {
                    return (
                        <CustomLink
                            className="flex items-center justify-center rounded-lg fill-contrast-400 p-1 ring-primary transition-colors duration-300 ease-out hover:fill-foreground focus-visible:outline-0 focus-visible:ring-2"
                      href={href}
                      key={i}
                    >
                      {icon}
                    </CustomLink>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Columns of Links */}
          <div className="flex w-full flex-1 flex-grow flex-wrap gap-y-8 @lg:gap-y-10 @xl:justify-end">
            {sections.length &&
              sections.map(({ title, links }, i) => {
                return (
                  <div
                    className="flex-1 basis-full pr-10 text-[15px] last:pr-0 @sm:basis-1/3 @2xl:pr-10 @4xl:max-w-[170px] @4xl:basis-auto"
                    key={i}
                  >
                    {title && <span className="mb-8 block font-medium">{title}</span>}

                    <ul>
                      {links.map((link, i) => {
                        return (
                          <li key={i}>
                            <CustomLink
                              className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2"
                              href={link.href}
                            >
                              {link.label}
                            </CustomLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-wrap-reverse justify-between gap-y-10 px-3 py-10 pb-20 @xl:px-6 @5xl:px-20">
          {/* Copyright */}
          <span className="block text-[15px] text-contrast-400">{copyright ?? ''}</span>

          {/* Payement Icons */}
          {paymentIcons && <div className="flex gap-2">{paymentIcons}</div>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
