import { FC } from "react";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import Button from "~/components/button";
import CardWrapper from "~/components/card-wrapper";
import Input from "~/components/input";
import LandingWrapper from "~/components/landing-wrapper";
import TransitionLoader from "~/components/transition-loader";

import { loginTitleStyles, loginWrapperStyle, optionalBlockStyle } from "./styles";

const LoginPage: FC = () => {
  const titleClasses = twMerge(...loginTitleStyles);

  return (
    <div className={loginWrapperStyle}>
      <TransitionLoader />
      <LandingWrapper className="flex-col justify-center gap-[30px]">
        <h3 className={titleClasses}>together</h3>
        <CardWrapper>
          <form className="flex flex-col items-center gap-[30px]">
            <div className="flex flex-col gap-5">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
            </div>
            <Button primary outline Icon={ArrowIcon}>
              Log In
            </Button>
          </form>
        </CardWrapper>
        <CardWrapper className={optionalBlockStyle}>
          <span>Don't have an account? Sign Up</span>
          <span>Forgot password?</span>
        </CardWrapper>
      </LandingWrapper>
    </div>
  );
};

export default LoginPage;
