import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import TransitionLoader from "~/components/transition-loader";
import Cubes from "~/components/cubes";
import LandingWrapper from "~/components/landing-wrapper";

import * as S from "./styles";

interface IProps {
  children: ReactNode;
}

const AuthorizationWrapper: FC<IProps> = ({ children }) => {
  const titleClasses = twMerge(...S.authTitleStyles);

  return (
    <div className={S.authWrapperStyle}>
      <TransitionLoader />
      <Cubes randomize />
      <LandingWrapper className={S.landingWrapperOverride}>
        <h3 className={titleClasses}>together</h3>
        {children}
      </LandingWrapper>
    </div>
  );
};

export default AuthorizationWrapper;
