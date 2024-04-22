import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";

import AppNavbar from "~/components/app-navbar";
import Cubes from "~/components/cubes";

import { useAuth } from "~/hooks/useAuth";
import { routes } from "~/router/constants";
import TransitionLoader from "~/components/transition-loader";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    !isLoggedIn && navigate(routes.landing.login, { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <main>
      <TransitionLoader />
      <AppNavbar />
      {createPortal(<Cubes randomize />, document.getElementById("portal") as HTMLElement)}
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
