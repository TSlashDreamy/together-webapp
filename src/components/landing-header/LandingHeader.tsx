import { FC } from "react";

import Button from "~/components/button";
import Logo from "~/components/logo";

const LandingHeader: FC = () => {
  const classes =
    "absolute top-3.5 inset-x-0 flex justify-between items-center mx-6 py-5 px-[100px] rounded-[20px] bg-semitransparent-dark backdrop-blur-[150px]";

  return (
    <div className={classes}>
      <Logo />
      <div className="flex gap-5 items-center">
        <Button primary outline>
          Log In
        </Button>
        <Button primary>Sign Up</Button>
      </div>
    </div>
  );
};

export default LandingHeader;
