import { FC } from "react";

import LandingWelcoming from "~/containers/landing-welcoming";
import LandingWrapper from "~/components/landing-wrapper";
import TransitionLoader from "~/components/transition-loader";
import Cubes from "~/components/cubes";

const LandingPage: FC = () => {
  return (
    <div className="bg-landing-gradient bg-cover bg-center">
      <TransitionLoader />
      <LandingWrapper>
        <LandingWelcoming />
        <Cubes />
      </LandingWrapper>
    </div>
  );
};

export default LandingPage;
