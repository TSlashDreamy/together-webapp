import { FC, Fragment } from "react";

import LandingHeader from "~/components/landing-header";
import Blobs from "~/components/blobs";
import LandingWrapper from "~/components/landing-wrapper";
import LandingWelcoming from "~/containers/landing-welcoming";

const LandingPage: FC = () => {
  return (
    <Fragment>
      <LandingHeader />
      <Blobs />
      <LandingWrapper>
        <LandingWelcoming />
      </LandingWrapper>
    </Fragment>
  );
};

export default LandingPage;
