import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ErrorPage from "~/pages/error-page/ErrorPage";
import LandingPage from "~/pages/landing-page";
import LoginPage from "~/pages/login-page";
import PrivateLayout from "~/pages/private-layout";
import PublicLayout from "~/pages/public-layout";
import { routes } from "~/router/constants";

const RouteAnimator: FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={routes.Landing} element={<PublicLayout />} errorElement={<ErrorPage />}>
          <Route index element={<LandingPage />} />
          <Route path={routes.Login} element={<LoginPage />} />
        </Route>
        <Route path={routes.Home} element={<PrivateLayout />} errorElement={<ErrorPage />}>
          <Route index element={<div>Home</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default RouteAnimator;
