import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { ImSpinner9 as Spinner } from "react-icons/im";

import {
  buttonIconStyles,
  buttonStyles,
  dangerButtonStyle,
  dangerIconStyle,
  dangerOutlineStyle,
  disabledStyle,
  extraLargeStyle,
  hasIconStyle,
  largeStyle,
  mediumStyle,
  outlineButtonStyle,
  primaryButtonStyle,
  primaryOutlineStyle,
  secondaryButtonStyle,
  secondaryOutlineStyle,
  smallStyle,
  successButtonStyle,
  successIconStyle,
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
  Icon?: IconType;
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
  Icon,
  ...other
}) => {
  const optionalTypeCount = Number(!!primary) + Number(!!secondary);
  const optionalSizeCount =
    Number(!!extraLarge) + Number(!!large) + Number(!!medium) + Number(!!small);

  if (optionalTypeCount > 1 || optionalSizeCount > 1) throw new Error(optionalPropsError);

  const classes = twMerge(
    classNames(other.className, ...buttonStyles, {
      [primaryButtonStyle]: primary,
      [secondaryButtonStyle]: secondary,
      [successButtonStyle]: success,
      [dangerButtonStyle]: danger,
      [disabledStyle]: isLoading,
      [outlineButtonStyle]: outline,
      [primaryOutlineStyle]: outline && primary,
      [secondaryOutlineStyle]: outline && secondary,
      [successOutlineStyle]: outline && success,
      [dangerOutlineStyle]: outline && danger,
      [extraLargeStyle]: extraLarge,
      [largeStyle]: large,
      [mediumStyle]: medium,
      [smallStyle]: small,
      [hasIconStyle]: Boolean(Icon),
    })
  );

  const iconClasses = twMerge(
    classNames(...buttonIconStyles, {
      [successIconStyle]: success,
      [dangerIconStyle]: danger,
    })
  );

  return (
    <button {...other} disabled={isLoading} className={classes}>
      {children}
      {isLoading && <Spinner className="animate-spin" />}
      {Icon && !isLoading && (
        <div className={iconClasses}>
          <Icon />
        </div>
      )}
    </button>
  );
};

export default Button;
