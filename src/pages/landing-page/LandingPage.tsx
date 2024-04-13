import { FC } from "react";

import Blobs from "~/components/blobs";
import LandingWrapper from "~/components/landing-wrapper";
import LandingWelcoming from "~/containers/landing-welcoming";
import TransitionLoader from "~/components/transition-loader/TransitionLoader";

const LandingPage: FC = () => {
  return (
    <div>
      <TransitionLoader />
      <Blobs />
      <LandingWrapper>
        <LandingWelcoming />
      </LandingWrapper>
    </div>
  );
};

export default LandingPage;
