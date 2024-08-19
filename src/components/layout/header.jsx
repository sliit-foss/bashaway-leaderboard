import { useEffect, useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { portalURL } from "@/constants";
import { hallOfFame } from "@/constants/routes";
import { useBreakpoint } from "@/hooks";
import { BashawayLeaderboard } from "@/icons";
import { AnimatedSwitcher, Button } from "@sliit-foss/bashaway-ui/components";
import { Bashaway, FOSS, Link as LinkIcon, Times } from "@sliit-foss/bashaway-ui/icons";

const mobileNavIconStyles =
  "block xl:hidden absolute right-8 lg:right-24 h-[1.65rem] w-[1.65rem] cursor-pointer hover:text-black/70 transition-all duration-medium";

const buttonStyles = "mt-1.5 xl:mt-0 px-8 xl:px-[1.15rem] pb-2.5 xl:pb-[0.4rem] min-w-[12rem] xl:min-w-[6rem]";

const Header = ({ className }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isHallOfFame, setIsHallOfFame] = useState();

  const breakpoints = useBreakpoint();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsHallOfFame(pathname === hallOfFame);
  }, [pathname]);

  return (
    <header
      className={twMerge(
        `w-full min-h-[70px] xs:min-h-[90px] backdrop-blur-md fixed z-[200] transition-all duration-long border-b`,
        className,
        mobileNavOpen && !breakpoints["xl"] ? "h-screen bg-white" : "h-[70px] xs:h-[90px] bg-white/80"
      )}
    >
      <div className="w-full max-w-body mx-auto flex justify-between py-3.5 xs:py-6 px-8 lg:px-24">
        <div
          className={twMerge(
            "grid place-content-start grid-flow-col items-center space-x-[20px] sm:space-x-[30px] transition-all duration-medium",
            !breakpoints["xl"] ? (mobileNavOpen ? "opacity-0" : "opacity-100 pointer-events-none") : ""
          )}
        >
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Home"
            className="hidden xsm:flex gap-2"
          >
            <Bashaway width={160} className="w-[160px] sm:w-[185px]" />
            <BashawayLeaderboard className="hidden sm:block" />
          </Link>
          <Times height="15px" width="15px" className="hidden xsm:block opacity-20" />
          <FOSS className="transform scale-[0.85] -translate-x-1" />
        </div>
        <div className={twMerge("absolute inset-0 xl:relative")}>
          <div className="w-full min-h-[70px] xs:min-h-[90px] xl:!min-h-0 flex justify-end items-center px-8 lg:px-24 relative z-50">
            <AnimatedSwitcher
              show={!mobileNavOpen && !breakpoints["xl"]}
              className="flex justify-center items-center h-full w-full"
              component={
                <RxHamburgerMenu className={twMerge(mobileNavIconStyles)} onClick={setMobileNavOpen.bind(this, true)} />
              }
              alternateComponent={
                <RxCross1 className={twMerge(mobileNavIconStyles)} onClick={setMobileNavOpen.bind(this, false)} />
              }
            />
          </div>
          <div
            className={twMerge(
              `h-full xl:bg-transparent xl:h-auto flex flex-col xl:flex-row justify-center items-center gap-[1.575rem] cursor-pointer font-semibold text-2xl xl:text-base`,
              !breakpoints["xl"] ? "transition-all duration-medium" : "",
              mobileNavOpen && !breakpoints["xl"]
                ? "opacity-100 delay-150 pb-[70px] xs:pb-[90px]"
                : "opacity-0 pointer-events-none xl:opacity-100 xl:pointer-events-auto"
            )}
          >
            <Link
              to={isHallOfFame ? "/" : "/hall-of-fame"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Home"
              className="ml-[-1.6125rem] gap-2"
            >
              <div className="group flex gap-1.5 items-center">
                <span className="link ml-8 xl:ml-0">{isHallOfFame ? "Leaderboard" : "Hall of Fame"}</span>
              </div>
            </Link>
            <div className="group flex gap-1.5 items-center">
              <a href="https://bashaway.sliitfoss.org" target="_blank" className="link ml-8 xl:ml-0" rel="noreferrer">
                The Competition
              </a>
              <LinkIcon className="transform -rotate-45 before:w-[1.2rem] xl:before:w-[0.6rem] before:group-hover:w-[1.45rem] xl:before:group-hover:w-[0.75rem] translate-y-[-0.1rem]" />
            </div>
            <a href={portalURL}>
              <Button className={buttonStyles}>Back to Portal</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
