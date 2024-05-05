import { FC } from "react";
import { createPortal } from "react-dom";

import LandingWelcoming from "~/containers/landing-welcoming";
import LandingWrapper from "~/components/landing-wrapper";
import Cubes from "~/components/cubes";

import { landingStyle } from "./styles";

const LandingPage: FC = () => {
  return (
    <div className={landingStyle}>
      <LandingWrapper>
        <LandingWelcoming />
        {createPortal(<Cubes />, document.getElementById("portal") as HTMLElement)}
      </LandingWrapper>
    </div>
  );
};

export default LandingPage;
