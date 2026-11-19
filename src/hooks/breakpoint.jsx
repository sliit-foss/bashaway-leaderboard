import { useEffect, useState } from "react";

const screens = {
  "xs": "400px",
  "xsm": "450px",
  "sm": "640px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1536px"
};

const calculateBreakpoints = () =>
  Object.entries(screens).reduce((acc, [key, value]) => {
    acc[key] = window.matchMedia(`(min-width: ${value})`).matches;
    return acc;
  }, {});

const useBreakpoint = () => {
  const [breakpoints, setBreakpoints] = useState(calculateBreakpoints());
  useEffect(() => {
    const resizeHandler = () => {
      setBreakpoints(calculateBreakpoints());
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return breakpoints;
};

export default useBreakpoint;
