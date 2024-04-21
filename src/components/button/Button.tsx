import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { ImSpinner9 as Spinner } from "react-icons/im";

import * as S from "./styles";
import { optionalPropsError } from "./constants";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  outline?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
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
  disabled,
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
    classNames(...S.buttonStyles, other.className, {
      [S.primaryButtonStyle]: primary,
      [S.secondaryButtonStyle]: secondary,
      [S.successButtonStyle]: success,
      [S.dangerButtonStyle]: danger,
      [S.disabledStyle]: isLoading || disabled,
      [S.outlineButtonStyle]: outline,
      [S.primaryOutlineStyle]: outline && primary,
      [S.secondaryOutlineStyle]: outline && secondary,
      [S.successOutlineStyle]: outline && success,
      [S.dangerOutlineStyle]: outline && danger,
      [S.extraLargeStyle]: extraLarge,
      [S.largeStyle]: large,
      [S.mediumStyle]: medium,
      [S.smallStyle]: small,
      [S.hasIconStyle]: Boolean(Icon),
    })
  );

  const iconClasses = twMerge(
    classNames(...S.buttonIconStyles, {
      [S.successIconStyle]: success,
      [S.dangerIconStyle]: danger,
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
