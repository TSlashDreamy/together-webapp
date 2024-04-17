import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Button from "~/components/button";

import { removeUser } from "~/redux/slices/userSlice";

import { useAuth } from "~/hooks/useAuth";
import { routes } from "~/router/constants";
import { useAppDispatch } from "~/hooks/useRedux";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { email, id, isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    !isLoggedIn && navigate(routes.Login, { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <main>
      {/* //!TEMP */}
      PRIVATE LAYOUT!!!!!
      {email}
      {id}
      <Button secondary onClick={() => dispatch(removeUser())}>Logout</Button>
      {/* //!TEMP */}
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
