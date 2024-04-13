import { FC } from "react";

import Blobs from "~/components/blobs";
import TransitionLoader from "~/components/transition-loader/TransitionLoader";

const LoginPage: FC = () => {
  return (
    <div>
      <Blobs />
      <TransitionLoader />
      Login page
    </div>
  );
};

export default LoginPage;
