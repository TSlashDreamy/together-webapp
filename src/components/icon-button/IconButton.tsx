import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { ImSpinner9 as LoadingIcon } from "react-icons/im";

import * as S from "./styles";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: FC | IconType;
  disabled?: boolean;
  withoutOutline?: boolean;
  medium?: boolean;
  small?: boolean;
  danger?: boolean;
  iconOnly?: boolean;
  isLoading?: boolean;
}

const IconButton: FC<IProps> = ({
  Icon,
  disabled,
  withoutOutline,
  medium,
  small,
  danger,
  iconOnly,
  isLoading,
  ...other
}) => {
  const classes = twMerge(
    classNames(S.iconButtonStyles, other.className, {
      [S.disabledStyle]: disabled,
      [S.withoudOutlineStyle]: withoutOutline,
      [S.mediumStyle]: medium,
      [S.smallStyle]: small,
      [S.dangerStyle]: danger,
      [S.iconOnly]: iconOnly,
    })
  );

  const iconClasses = twMerge(
    classNames(S.iconStyle, {
      [S.iconDanger]: danger,
      "animate-spin": isLoading,
    })
  );

  return (
    <button {...other} className={classes} disabled={isLoading || disabled}>
      {isLoading ? <LoadingIcon className={iconClasses} /> : <Icon className={iconClasses} />}
    </button>
  );
};

export default IconButton;
