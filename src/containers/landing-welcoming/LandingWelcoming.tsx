import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Button from "~/components/button";
import LandingTitle from "~/containers/landing-welcoming/landing-title";

import { routes } from "~/router/constants";
import { descriptionStyle, wrapperStyle } from "./styles";

const LandingWelcoming: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={wrapperStyle}>
      <div className="flex flex-col items-start gap-y-10 pl-[60px]">
        <div>
          <LandingTitle />
          <span className={descriptionStyle}>
            Join your friends and loved ones to spend time together watching, listening, and reading
            anything!
          </span>
        </div>
        <Button primary outline onClick={() => navigate(routes.Signup)}>
          Let's go
        </Button>
      </div>
    </div>
  );
};

export default LandingWelcoming;
