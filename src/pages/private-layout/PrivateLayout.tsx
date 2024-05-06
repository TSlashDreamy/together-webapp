import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";

import AppNavbar from "~/components/app-navbar";
import Cubes from "~/components/cubes";
import OverlayMessage from "~/components/overlay-message";

import { useAuth } from "~/hooks/useAuth";
import { routes } from "~/router/constants";
import TransitionLoader from "~/components/transition-loader";
import { useAppSelector } from "~/hooks/useRedux";

const PrivateLayout = () => {
  const { restoringSession } = useAppSelector(state => state.authentication);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    !isLoggedIn && !restoringSession && navigate(routes.landing.login, { replace: true });
  }, [isLoggedIn, navigate, restoringSession]);

  return (
    <main>
      {restoringSession && <OverlayMessage message="Trying to restore your session" />}
      <TransitionLoader />
      <AppNavbar />
      {createPortal(<Cubes randomize />, document.getElementById("portal") as HTMLElement)}
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
