import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import TransitionLoader from "~/components/transition-loader";
import Cubes from "~/components/cubes";
import LandingWrapper from "~/components/landing-wrapper";

import { authTitleStyles, authWrapperStyle } from "./styles";

interface IProps {
    children: ReactNode,
}

const AuthorizationWrapper: FC<IProps> = ({ children }) => {
  const titleClasses = twMerge(...authTitleStyles);

  return (
    <div className={authWrapperStyle}>
      <TransitionLoader />
      <Cubes randomize />
      <LandingWrapper className="flex-col justify-center gap-[30px] relative z-20">
        <h3 className={titleClasses}>together</h3>
        {children}
      </LandingWrapper>
    </div>
  );
};

export default AuthorizationWrapper;
