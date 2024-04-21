import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ErrorPage from "~/pages/error-page/ErrorPage";
import LandingPage from "~/pages/landing-page";
import LoginPage from "~/pages/login-page";
import PrivateLayout from "~/pages/private-layout";
import PublicLayout from "~/pages/public-layout";
import SignupPage from "~/pages/signup-page";
import ResetPasswordPage from "~/pages/reset-password-page";
import HomePage from "~/pages/home-page";
import SearchPage from "~/pages/search-page";
import FriendsPage from "~/pages/friends-page";
import CollectionsPage from "~/pages/collections-page";
import LikedPage from "~/pages/liked-page";

import { routes } from "~/router/constants";
import RoomPage from "~/pages/room-page/RoomPage";

const RouteAnimator: FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={routes.landing.main} element={<PublicLayout />} errorElement={<ErrorPage />}>
          <Route path={routes.landing.login} element={<LoginPage />} />
          <Route path={routes.landing.signup} element={<SignupPage />} />
          <Route path={routes.landing.resetPass} element={<ResetPasswordPage />} />
          <Route index element={<LandingPage />} />
        </Route>
        <Route path={routes.app.home} element={<PrivateLayout />} errorElement={<ErrorPage />}>
          <Route path={routes.app.search} element={<SearchPage />} />
          <Route path={routes.app.friends} element={<FriendsPage />} />
          <Route path={routes.app.collections} element={<CollectionsPage />} />
          <Route path={routes.app.liked} element={<LikedPage />} />
          <Route path={routes.app.room} element={<RoomPage />} />
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default RouteAnimator;
