import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AppNavbar from "~/components/app-navbar";
import Button from "~/components/button";

import { removeUser } from "~/redux/slices/userSlice";

import { useAuth } from "~/hooks/useAuth";
import { routes } from "~/router/constants";
import { useAppDispatch } from "~/hooks/useRedux";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase";
import TransitionLoader from "~/components/transition-loader";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !isLoggedIn && navigate(routes.landing.login, { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <main>
      <TransitionLoader />
      <AppNavbar />
      <Button secondary className="fixed right-0 top-0" onClick={() => {signOut(auth); dispatch(removeUser());}}>Logout</Button>
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
