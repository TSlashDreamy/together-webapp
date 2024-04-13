import { FC } from "react";
import Button from "~/components/button";
import CardWrapper from "~/components/card-wrapper";
import Input from "~/components/input";

import LandingWrapper from "~/components/landing-wrapper";
import TransitionLoader from "~/components/transition-loader";

const LoginPage: FC = () => {
  return (
    <div className="bg-landing-gradient bg-cover bg-center">
      <TransitionLoader />
      <LandingWrapper className="justify-center flex-col gap-[30px]">
        <h3 className="text-text-white text-[48px] font-medium">together</h3>
        <CardWrapper>
          <form className="flex flex-col items-center gap-[30px]">
            <div className="flex flex-col gap-5">
              <Input placeholder="Email" type="email" />
              <Input placeholder="Password" type="password" />
            </div>
            <Button primary outline>
              Log In
            </Button>
          </form>
        </CardWrapper>
        <CardWrapper className="p-[20px] text-[16px] text-text-white gap-[10px] font-extralight">
          <span>Don't have an account?</span>
          <span>Forgot password?</span>
        </CardWrapper>
      </LandingWrapper>
    </div>
  );
};

export default LoginPage;
