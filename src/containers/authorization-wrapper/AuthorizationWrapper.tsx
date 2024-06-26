import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

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
      {createPortal(<Cubes randomize />, document.getElementById("portal") as HTMLElement)}
      <LandingWrapper className={S.landingWrapperOverride}>
        <h3 className={titleClasses}>together</h3>
        {children}
      </LandingWrapper>
    </div>
  );
};

export default AuthorizationWrapper;
