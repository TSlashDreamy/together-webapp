import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import LandingHeader from "~/components/landing-header";
import TransitionLoader from "~/components/transition-loader";

import { useAuth } from "~/hooks/useAuth";
import { routes } from "~/router/constants";

const PublicLayout: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    isLoggedIn && navigate(routes.app.home, { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <main>
      <TransitionLoader />
      <LandingHeader />
      <Outlet />
    </main>
  );
};

export default PublicLayout;
