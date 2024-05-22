import { FC, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import Button from "~/components/button";
import Logo from "~/components/logo";

import { routes } from "~/router/constants";
import * as S from "./styles";

const LandingHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authRoutes = useMemo(
    () => [
      String(routes.landing.login),
      String(routes.landing.signup),
      String(routes.landing.resetPass),
    ],
    []
  );

  const isAuthPage = useMemo(
    () => authRoutes.includes(location.pathname),
    [authRoutes, location.pathname]
  );

  const classes = twMerge(
    classNames(S.landingHeaderStyle, {
      [S.landingHeaderOnLoginStyle]: isAuthPage,
    })
  );

  return (
    <div className={classes}>
      <Logo hidden={isAuthPage} filled />
      <div className={S.buttonWrapperStyle}>
        {isAuthPage ? (
          <Button primary outline onClick={() => navigate(routes.landing.main)}>
            Go Back
          </Button>
        ) : (
          <>
            <Button primary outline onClick={() => navigate(routes.landing.login)}>
              Log In
            </Button>
            <Button primary onClick={() => navigate(routes.landing.signup)}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingHeader;
