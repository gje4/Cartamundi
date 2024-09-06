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

            <div className="flex items-center gap-[10px]">
              <a href="//www.facebook.com">
                <svg className="w-[24px] h-[24px] block" xmlns="http://www.w3.org/2000/svg" width="397.4" height="397.3" viewBox="0 0 397.4 397.3">
                  <g id="Folder_1" data-name="Folder 1" transform="translate(-181.6 -336.2)">
                    <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;"
                          d="M579,534.9c0,109.7-89,198.6-198.7,198.6S181.6,644.6,181.6,534.9c0-109.8,89-198.7,198.7-198.7S579,425.1,579,534.9Z"
                          fill="#1877F2"/>
                    <path id="_Path_" data-name="&lt;Path&gt;"
                          d="M439.2,519.5,435.9,546a8.857,8.857,0,0,1-8.8,7.8h-43V664.9a136.638,136.638,0,0,1-13.8.7,152.162,152.162,0,0,1-30.4-3.1V553.8H306.8a5.484,5.484,0,0,1-5.5-5.5V515a5.484,5.484,0,0,1,5.5-5.5h33.1V459.6a55.289,55.289,0,0,1,55.2-55.4h38.6a5.484,5.484,0,0,1,5.5,5.5V443a5.484,5.484,0,0,1-5.5,5.5H406.1a22.044,22.044,0,0,0-22,22.2v38.8h46.3a8.945,8.945,0,0,1,8.8,10Z"
                          fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="//www.twitter.com">
                <svg className="w-[24px] h-[24px] block" xmlns="http://www.w3.org/2000/svg" width="397.4" height="397.3" viewBox="0 0 397.4 397.3">
                  <g id="_Group_" data-name="&lt;Group&gt;" transform="translate(-661.6 -336.2)">
                    <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;"
                          d="M1059,534.9c0,109.7-89,198.6-198.7,198.6S661.6,644.6,661.6,534.9c0-109.8,89-198.7,198.7-198.7S1059,425.1,1059,534.9Z"
                          fill="#121214"/>
                    <path id="_Compound_Path_2" data-name="&lt;Compound Path&gt;"
                          d="M976.7,639.1H893.2l-51.5-71.9-67.2,71.9H744l84.5-90.4L744,430.7h83.4l48.4,67.4,63-67.4h30.6L889,516.6ZM904.6,617h29.1L816.1,452.8H787Z"
                          fill="#fff" fill-rule="evenodd"/>
                  </g>
                </svg>
              </a>
              <a href="//www.instagram.com">
                <svg className="w-[24px] h-[24px] block" xmlns="http://www.w3.org/2000/svg" width="397.4" height="397.3" viewBox="0 0 397.4 397.3">
                  <g id="_Group_" data-name="&lt;Group&gt;" transform="translate(-1141.6 -336.2)">
                    <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;"
                          d="M1539,534.9c0,109.7-89,198.6-198.7,198.6s-198.7-88.9-198.7-198.6c0-109.8,89-198.7,198.7-198.7S1539,425.1,1539,534.9Z"
                          fill="#C32AA3"/>
                    <path id="_Compound_Path_2" data-name="&lt;Compound Path&gt;"
                          d="M1444.5,481V588.8a50.338,50.338,0,0,1-50.3,50.3H1286.4a50.338,50.338,0,0,1-50.3-50.3V481a50.274,50.274,0,0,1,50.3-50.3h107.8A50.274,50.274,0,0,1,1444.5,481Zm-17.9,3.6a35.977,35.977,0,0,0-36-36H1290a35.956,35.956,0,0,0-35.9,36V585.2a35.935,35.935,0,0,0,35.9,35.9h100.6a35.956,35.956,0,0,0,36-35.9Z"
                          fill="#fff" fill-rule="evenodd"/>
                    <path id="_Compound_Path_3" data-name="&lt;Compound Path&gt;"
                          d="M1394.3,534.9a53.9,53.9,0,1,1-53.9-53.9A53.923,53.923,0,0,1,1394.3,534.9Zm-18,0a35.9,35.9,0,1,0-35.9,35.9A36.02,36.02,0,0,0,1376.3,534.9Z"
                          fill="#fff" fill-rule="evenodd"/>
                    <path id="_Path_" data-name="&lt;Path&gt;"
                          d="M1397.9,488.1a10.75,10.75,0,1,1,10.8-10.7A10.8,10.8,0,0,1,1397.9,488.1Z" fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="//www.youtube.com">
                <svg className="w-[24px] h-[24px] block" xmlns="http://www.w3.org/2000/svg" width="397.4" height="397.3" viewBox="0 0 397.4 397.3">
                  <g id="_Group_" data-name="&lt;Group&gt;" transform="translate(-1621.6 -336.2)">
                    <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;"
                          d="M2019,534.9c0,109.7-89,198.6-198.7,198.6s-198.7-88.9-198.7-198.6c0-109.8,89-198.7,198.7-198.7S2019,425.1,2019,534.9Z"
                          fill="red"/>
                    <path id="_Compound_Path_2" data-name="&lt;Compound Path&gt;"
                          d="M1936.6,481.3V588.4a30.685,30.685,0,0,1-30.7,30.6H1734.7a30.685,30.685,0,0,1-30.7-30.6V481.3a30.685,30.685,0,0,1,30.7-30.6h171.2a30.685,30.685,0,0,1,30.7,30.6Zm-88.8,46.2-47.6-23.8a8.259,8.259,0,0,0-12,7.4v47.6a8.33,8.33,0,0,0,12,7.4l47.6-23.8a8.272,8.272,0,0,0,0-14.8Z"
                          fill="#fff" fill-rule="evenodd"/>
                  </g>
                </svg>
              </a>
              <a href="//www.pinterest.com">
                <svg className="w-[24px] h-[24px] block" xmlns="http://www.w3.org/2000/svg" width="397.4" height="397.4" viewBox="0 0 397.4 397.4">
                  <g id="_Group_" data-name="&lt;Group&gt;" transform="translate(-661.6 -901.3)">
                    <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;"
                          d="M1059,1100c0,109.7-89,198.7-198.7,198.7s-198.7-89-198.7-198.7,89-198.7,198.7-198.7S1059,990.3,1059,1100Z"
                          fill="#BD081C"/>
                    <path id="_Path_" data-name="&lt;Path&gt;"
                          d="M812.7,1222.2c3.8-3.6,20-20.3,28.5-54.9l6.4-26.3c6,6.3,14.3,10.4,23.1,12.6,35.6,8.7,70.1-29.3,79.1-65.9,12.5-51.1-13.6-96.3-56.9-106.9-49.8-12.2-108.6,12.1-123,70.6-5,20.6-3.3,51.7,24.6,66.5a4.864,4.864,0,0,0,7.1-3.2l3.9-15.8a5.333,5.333,0,0,0-1.7-5c-9.9-9-12.2-23.7-8.9-37.5,9.8-39.6,50.4-55.8,85.1-47.3,30,7.4,48.3,38,39.8,72.6-6.1,24.8-23.2,52-48,46-14.8-3.7-16.5-18.2-12.5-34.6l9.1-37a17.87,17.87,0,0,0-13-21.6c-9.6-2.4-24.7,4.4-29.6,24.2-2.8,11.6-.5,20.8,3.9,27L811.5,1160c-8.4,34.3-2.1,56.4-.2,61.7"
                          fill="#fff"/>
                  </g>
                </svg>
              </a>
              <a href="//www.linkedin.com">
                <svg className="w-[24px] h-[24px] block" xmlns="http://www.w3.org/2000/svg" width="397.4" height="397.4" viewBox="0 0 397.4 397.4">
                  <g id="_Group_" data-name="&lt;Group&gt;" transform="translate(-1141.6 -901.3)">
                    <path id="_Compound_Path_" data-name="&lt;Compound Path&gt;"
                          d="M1539,1100c0,109.7-89,198.7-198.7,198.7s-198.7-89-198.7-198.7,89-198.7,198.7-198.7S1539,990.3,1539,1100Z"
                          fill="#0A66C2"/>
                    <g id="_Group_2" data-name="&lt;Group&gt;">
                      <path id="_Path_" data-name="&lt;Path&gt;"
                            d="M1295.5,1021.3a25.6,25.6,0,1,1-25.6-25.6,25.585,25.585,0,0,1,25.6,25.6Z" fill="#fff"/>
                      <path id="_Path_2" data-name="&lt;Path&gt;"
                            d="M1289.4,1191.9h-38.9a1.967,1.967,0,0,1-1.9-1.9V1065.8a1.967,1.967,0,0,1,1.9-1.9h38.9a1.967,1.967,0,0,1,1.9,1.9V1190A1.967,1.967,0,0,1,1289.4,1191.9Z"
                            fill="#fff"/>
                      <path id="_Path_3" data-name="&lt;Path&gt;"
                            d="M1436.3,1110.9v72.5a8.644,8.644,0,0,1-8.6,8.5h-25.6a8.624,8.624,0,0,1-8.5-8.5v-59.7a21.3,21.3,0,1,0-42.6,0v59.7a8.644,8.644,0,0,1-8.6,8.5h-25.5a8.644,8.644,0,0,1-8.6-8.5V1072.5a8.664,8.664,0,0,1,8.6-8.6h25.5a8.664,8.664,0,0,1,8.6,8.6v5.4c8.5-11,22.6-18.2,38.4-18.2C1412.9,1059.7,1436.3,1076.7,1436.3,1110.9Z"
                            fill="#fff"/>
                    </g>
                  </g>
                </svg>
              </a>
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
