import { useEffect } from "react";
import { useState } from "react";

const { useLocation } = require("react-router-dom");

const useDetectHallOfFame = () => {
  const [isHallOfFame, setIsHallOfFame] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsHallOfFame(pathname == "hall-of-fame");
  }, [pathname]);

  return isHallOfFame;
};

export default useDetectHallOfFame;
