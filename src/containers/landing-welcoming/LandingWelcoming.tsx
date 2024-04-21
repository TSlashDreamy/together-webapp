import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "~/components/button";
import LandingTitle from "~/containers/landing-welcoming/landing-title";

import { routes } from "~/router/constants";
import * as S from "./styles";

const LandingWelcoming: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={S.wrapperStyle}>
      <div className={S.leftSideWrapper}>
        <div>
          <LandingTitle />
          <span className={S.descriptionStyle}>
            Join your friends and loved ones to spend time together watching, listening, and reading
            anything!
          </span>
        </div>
        <Button primary outline onClick={() => navigate(routes.landing.signup)}>
          Let's go
        </Button>
      </div>
    </div>
  );
};

export default LandingWelcoming;
