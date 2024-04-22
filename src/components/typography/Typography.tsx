import { FC, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { typographyStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const H1: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[64px]", other.className);
  return <h1 className={classes}>{children}</h1>;
};

const H2: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[48px]", other.className);
  return <h2 className={classes}>{children}</h2>;
};

const H3: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[40px] font-normal", other.className);
  return <h3 className={classes}>{children}</h3>;
};

const H4: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[32px] font-light", other.className);
  return <h4 className={classes}>{children}</h4>;
};

const H5: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[48px]", other.className);
  return <h5 className={classes}>IMPLEMENT ME!!</h5>; // TODO: implement styling
};

const H6: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[48px]", other.className);
  return <h6 className={classes}>IMPLEMENT ME!!</h6>; // TODO: implement styling
};

const SPAN: FC<IProps> = ({ children, ...other }) => {
  const classes = twMerge(typographyStyle, "text-[24px] font-light", other.className);
  return <span className={classes}>{children}</span>;
};

const Typography = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  SPAN,
};

export default Typography;
