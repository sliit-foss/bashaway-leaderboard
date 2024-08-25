import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HALL_OF_FAME, HOME } from "@/constants";
import { HallOfFame, Home, NotFound } from "@/pages";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path={HOME} element={<Home />} />
        <Route path={HALL_OF_FAME} element={<HallOfFame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
