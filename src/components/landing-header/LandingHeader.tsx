import { FC, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import Button from "~/components/button";
import Logo from "~/components/logo";
import { routes } from "~/router/constants";

import { landingHeaderOnLoginStyles, landingHeaderStyles } from "./styles";

const LandingHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = useMemo(() => location.pathname === `/${routes.Login}`, [location.pathname]);

  const classes = twMerge(
    classNames(landingHeaderStyles, {
      [landingHeaderOnLoginStyles]: isLoginPage,
    })
  );

  return (
    <div className={classes}>
      <Logo hidden={isLoginPage} />
      <div className="flex gap-5 items-center">
        {isLoginPage ? (
          <Button primary outline onClick={() => navigate(-1)}>
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
