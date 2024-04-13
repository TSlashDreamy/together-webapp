import { FC, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Button from "~/components/button";
import Logo from "~/components/logo";
import { routes } from "~/router/constants";

const LandingHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = useMemo(() => location.pathname === `/${routes.Login}`, [location.pathname]);

  const classes =
    "fixed top-3.5 inset-x-0 z-50 flex justify-between items-center mx-6 py-5 px-[100px] rounded-[20px] bg-semitransparent-dark backdrop-blur-[150px]";

  return (
    <div className={classes}>
      <Logo />
      <div className="flex gap-5 items-center">
        {isLoginPage ? (
          <Button secondary onClick={() => navigate(-1)}>
            Go Back
          </Button>
        ) : (
          <>
            <Button primary outline onClick={() => navigate(routes.Login)}>
              Log In
            </Button>
            <Button primary>Sign Up</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingHeader;
