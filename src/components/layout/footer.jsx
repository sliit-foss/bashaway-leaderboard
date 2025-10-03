import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import {
  facebook,
  instagram,
  linkedIn,
  repositoryLink,
  sliitFossMainWebsite,
  tikTok,
  twitter,
  youTube
} from "@/constants";
import { Bashaway, FOSS } from "@sliit-foss/bashaway-ui/icons";

const usefulLinks = [
  {
    name: "Visit Us",
    url: sliitFossMainWebsite
  },
  {
    name: "Source Code",
    url: repositoryLink
  }
];

const Footer = ({ className }) => {
  return (
    <>
      <div className="divider" />
      <footer
        className={twMerge(`bg-white flex w-full justify-center z-50`, className)}
        style={{
          boxShadow: "0px -40px 100px var(--background)"
        }}
      >
        <div className="w-full max-w-body mx-0 flex flex-col-reverse md:flex-row items-center sm:items-start justify-between pt-16 pb-24 px-8 lg:px-24">
          <div className="flex flex-col items-center md:items-start gap-y-5 col-start-1">
            <FOSS />
            <p className="md:w-[320px] px-2 sm:px-0 text-sm text-center md:text-left text-gray-500 opacity-80 font-consolas">
              Welcome to the SLIIT FOSS Community. We&apos;re a group of volunteers who believe in the usage of Free and
              Open Source Software (FOSS)
            </p>
            <div className="font-semibold text-[20px] font-cabinet">CONNECT WITH US</div>
            <div className="flex space-x-3 flex-shrink-0 -ml-0.5">
              <a href={facebook} target="_blank" className="icon-hover" rel="noreferrer" aria-label="Facebook">
                <AiFillFacebook className="h-5 w-5" />
              </a>
              <a href={instagram} target="_blank" className="icon-hover" rel="noreferrer" aria-label="Instagram">
                <AiFillInstagram className="h-[1.292rem] w-[1.292rem] -translate-y-[0.01rem]" />
              </a>
              <a href={twitter} target="_blank" className="icon-hover" rel="noreferrer" aria-label="Twitter">
                <AiOutlineTwitter className="h-[1.48rem] w-[1.48rem] -translate-y-[0.10rem]" />
              </a>
              <a href={linkedIn} target="_blank" className="icon-hover" rel="noreferrer" aria-label="LinkedIn">
                <AiFillLinkedin className="h-5 w-5" />
              </a>
              <a href={youTube} target="_blank" className="icon-hover" rel="noreferrer" aria-label="YouTube">
                <AiFillYoutube className="h-[1.36rem] w-[1.36rem] -translate-y-[0.06rem]" />
              </a>
              <a href={tikTok} target="_blank" className="icon-hover" rel="noreferrer" aria-label="TikTok">
                <FaTiktok className="h-[1.15rem] w-[1.15rem]" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end -translate-y-1.5 mb-5 gap-8 md:gap-10">
            <Bashaway />
            <div className="flex flex-col items-center md:items-end gap-3">
              {usefulLinks.map((link, index) => {
                return (
                  <a
                    key={`useful-link-${index}`}
                    href={link.url}
                    target="_blank"
                    className="text-sm text-gray-500 opacity-80 font-consolas hover:underline"
                    rel="noreferrer"
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
