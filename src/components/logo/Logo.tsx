import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import LogoIcon from "~/assets/Logo.svg?react";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
  onlyLogo?: boolean;
  filled?: boolean;
  svgStyles?: string;
}

const Logo: FC<IProps> = ({ hidden, onlyLogo, filled, svgStyles, ...other }) => {
  const classes = twMerge(
    classNames(S.logoStyle, other.className, {
      "opacity-0": hidden,
    })
  );
  const logoClasses = twMerge(
    classNames(S.svg, svgStyles, {
      "fill-text-white": filled,
    })
  );

  return (
    <div className={classes}>
      <LogoIcon className={logoClasses} />
      {!onlyLogo && "together"}
    </div>
  );
};

export default Logo;
