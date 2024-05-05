import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ErrorPage from "~/pages/error/ErrorPage";
import LandingPage from "~/pages/landing";
import LoginPage from "~/pages/login";
import PrivateLayout from "~/pages/private-layout";
import PublicLayout from "~/pages/public-layout";
import SignupPage from "~/pages/signup";
import ResetPasswordPage from "~/pages/reset-password";
import HomePage from "~/pages/home";
import SearchPage from "~/pages/search";
import FriendsPage from "~/pages/friends";
import CollectionsPage from "~/pages/collections";
import LikedPage from "~/pages/liked";
import RoomPage from "~/pages/room/RoomPage";
import SettingsPage from "~/pages/settings";

import { routes } from "~/router/constants";

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
          <Route path={routes.app.settings} element={<SettingsPage />} />
          <Route path={routes.app.serviceRedirect} element={new Error("NOT IMPLEMENTED!")} />
          <Route path={routes.app.myProfile} element={new Error("NOT IMPLEMENTED!")} />
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default RouteAnimator;
