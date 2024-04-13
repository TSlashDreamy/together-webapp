import { FC } from "react";

import TransitionLoader from "~/components/transition-loader/TransitionLoader";

const LoginPage: FC = () => {
  return (
    <div className="bg-landing-gradient bg-cover bg-center">
      <TransitionLoader />
      Login page
    </div>
  );
};

export default LoginPage;
