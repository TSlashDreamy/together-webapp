import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";

import ServiceHealthModal from "~/containers/service-health-modal";
import AppNavbar from "~/components/app-navbar";
import Cubes from "~/components/cubes";
import OverlayMessage from "~/components/overlay-message";
import TransitionLoader from "~/components/transition-loader";

import { useAuth } from "~/hooks/useAuth";
import { useAppSelector } from "~/hooks/useRedux";

import { routes } from "~/router/constants";

const PrivateLayout = () => {
  const { restoringSession } = useAppSelector(state => state.authentication);
  const { servicesHealth } = useAppSelector(state => state.app);
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
      <ServiceHealthModal isOpen={!servicesHealth.healthy} message={servicesHealth.message} />
    </main>
  );
};

export default PrivateLayout;
