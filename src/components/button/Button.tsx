import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import {
  buttonStyles,
  dangerButtonStyle,
  dangerOutlineStyle,
  extraLargeStyle,
  largeStyle,
  mediumStyle,
  outlineButtonStyle,
  primaryButtonStyle,
  primaryOutlineStyle,
  secondaryButtonStyle,
  secondaryOutlineStyle,
  smallStyle,
  successButtonStyle,
  successOutlineStyle,
} from "./styles";
import { optionalPropsError } from "./constants";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  outline?: boolean;
  isLoading?: boolean;
  extraLarge?: boolean;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
}

const Button: FC<IProps> = ({
  children,
  primary,
  secondary,
  success,
  danger,
  outline,
  isLoading,
  extraLarge,
  large,
  medium,
  small,
  ...other
}) => {
  const optionalTypeCount =
    Number(!!primary) + Number(!!secondary) + Number(!!success) + Number(!!danger);
  const optionalSizeCount =
    Number(!!extraLarge) + Number(!!large) + Number(!!medium) + Number(!!small);

  if (optionalTypeCount > 1 || optionalSizeCount > 1) throw new Error(optionalPropsError);

  const classes = twMerge(
    classNames(other.className, ...buttonStyles, {
      [primaryButtonStyle]: primary,
      [secondaryButtonStyle]: secondary,
      [successButtonStyle]: success,
      [dangerButtonStyle]: danger,
      "opacity-50": isLoading,
      [outlineButtonStyle]: outline,
      [primaryOutlineStyle]: outline && primary,
      [secondaryOutlineStyle]: outline && secondary,
      [successOutlineStyle]: outline && success,
      [dangerOutlineStyle]: outline && danger,
      [extraLargeStyle]: extraLarge,
      [largeStyle]: large,
      [mediumStyle]: medium,
      [smallStyle]: small,
    })
  );

  return (
    <button {...other} disabled={isLoading} className={classes}>
      {children}
      {/* //!TEMP LOADER */}
      {isLoading && <div className="rounded-full border-2 border-text-white size-3" />}
    </button>
  );
};

export default Button;
