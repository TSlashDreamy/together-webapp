import { FC } from "react";

import LandingWelcoming from "~/containers/landing-welcoming";
import LandingWrapper from "~/components/landing-wrapper";
import Cubes from "~/components/cubes";

import { landingStyle } from "./styles";

const LandingPage: FC = () => {
  return (
    <div className={landingStyle}>
      <LandingWrapper>
        <LandingWelcoming />
        <Cubes />
      </LandingWrapper>
    </div>
  );
};

export default LandingPage;
