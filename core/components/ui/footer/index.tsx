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

// @ts-ignore
import footerLogo from '../../../app/[locale]/(default)/_images/amare_footer_logo.png';


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

  let imageLogo:any = (typeof logo == 'object' && typeof logo.src != "undefined") ? logo: false;
  let logoRatio = 2.5;
  let logoW = 200;
  let logoH = logoW/logoRatio;
  imageLogo.src = imageLogo.src.replace("{:size}", logoW+"x"+logoH);
  let logoType = imageLogo ? "image" : "text";

  return (
    <footer
      className={clsx(
        'border-b-[4px] border-b-primary bg-background text-foreground @container',
        className,
      )}
    >
      <div className="max-w-[1520px] w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-t border-t-contrast-100 pt-16 py-[3rem] lg:px-[0px]">
          <div className="flex flex-col @2xl:w-1/3">
            {/* Contact Information */}
            {contactInformation?.address || contactInformation?.phone ? (
                <CustomLink
                    className="relative inline-block rounded-lg ring-primary focus-visible:outline-0 focus-visible:ring-2 mb-[30px]"
                    href="#"
                >
                  {typeof logo === 'string' ? (
                      <span className="font-heading text-2xl font-semibold">{logo}</span>
                  ) : (
                      imageLogo?.src && (
                          <img src="../../../../core/app/amare-logo-color.png" alt="logo"/>
                          /*<Image
                              alt={imageLogo.altText ?? 'Logo'}
                              className="object-contain"
                              height={logoH}
                              width={logoW}
                              src={footerLogo}
                          />*/
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

            <div className="italic">The Mental Wellness Company®</div>

            <div className="grid gap-[10px] mt-[20px] mb-[20px]">
              <div className="flex items-center gap-[4px]">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="#000">
                    <path
                        d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
                  </svg>
                </div>
                <a className="block text-[#522D72]" href="mailto:support@amare.com">support@amare.com</a>
              </div>
              <div className="flex items-center gap-[4px]">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="#000">
                    <path
                        d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                  </svg>
                </div>
                <a className="block text-[#522D72]" href="tel:1-888-898-8551">1-888-898-8551</a>
              </div>
            </div>

            {/* Social Media Links */}
            {socialMediaLinks && socialMediaLinks.length > 0 && (
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
                sections.map(({title, links}, i) => {
                  return (
                      <>
                        {links.length > 0 &&
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
                        }
                      </>
                  );
                })}
            <div
                className="flex-1 basis-full pr-10 text-[15px] last:pr-0 @sm:basis-1/3 @2xl:pr-10 @4xl:max-w-[170px] @4xl:basis-auto"
            >
              <span className="mb-8 block font-medium">Share</span>
              <ul>
                <li>
                  <a
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                      href='/join-us'
                  >
                    Become A Brand Partner
                  </a>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Refer As A Customer
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Amare Global Events
                  </div>
                </li>
              </ul>
            </div>

            <div
                className="flex-1 basis-full pr-10 text-[15px] last:pr-0 @sm:basis-1/3 @2xl:pr-10 @4xl:max-w-[170px] @4xl:basis-auto"
            >
              <span className="mb-8 block font-medium">Science</span>
              <ul>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Quality
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Scientific Advisory Board
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Wellness Advisory Board
                  </div>
                </li>
              </ul>
            </div>

            <div
                className="flex-1 basis-full pr-10 text-[15px] last:pr-0 @sm:basis-1/3 @2xl:pr-10 @4xl:max-w-[170px] @4xl:basis-auto"
            >
              <span className="mb-8 block font-medium">Our Story</span>
              <ul>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Our mission
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Our Vision
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Our Team
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Our Impact
                  </div>
                </li>
              </ul>
            </div>

            <div
                className="flex-1 basis-full pr-10 text-[15px] last:pr-0 @sm:basis-1/3 @2xl:pr-10 @4xl:max-w-[170px] @4xl:basis-auto"
            >
              <span className="mb-8 block font-medium">Info Center</span>
              <ul>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Blog
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Reviews
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Contact Us
                  </div>
                </li>
                <li>
                  <div
                      className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 hover:opacity-100 focus-visible:outline-0 focus-visible:ring-2 leading-[1.3]"
                  >
                    Careers
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
        <div className="st_flex-col flex flex-wrap gap-x-[30px] gap-y-[12px] justify-between items-center pb-[20px]">
          <div className="st_footer-links flex items-center">
            <div
                className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 focus-visible:outline-0 focus-visible:ring-2">Privacy
              Policy
            </div>
            <div
                className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 focus-visible:outline-0 focus-visible:ring-2">Terms
              & Conditions
            </div>
            <div
                className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 focus-visible:outline-0 focus-visible:ring-2">FAQ
            </div>
            <div
                className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 focus-visible:outline-0 focus-visible:ring-2">Shipping
              Policy
            </div>
            <div
                className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 focus-visible:outline-0 focus-visible:ring-2">Return
              Policy
            </div>
            <div
                className="block rounded-lg py-2 font-medium opacity-50 ring-primary transition-opacity duration-300 focus-visible:outline-0 focus-visible:ring-2">Policy
              Manual
            </div>
          </div>
          {/* Payement Icons */}
          {paymentIcons && <div className="flex gap-2">{paymentIcons}</div>}
        </div>

        <div className="flex flex-wrap-reverse justify-center pt-[20px] pb-[50px] border-t border-t-[#c4c4c4]">
          {/* Copyright */}
          <span className="block text-[15px] text-contrast-400">{copyright ?? ''}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
