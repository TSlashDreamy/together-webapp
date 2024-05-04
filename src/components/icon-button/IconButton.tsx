import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  Icon: FC | IconType;
  disabled?: boolean;
  withoutOutline?: boolean;
  medium?: boolean;
  small?: boolean;
  danger?: boolean;
  iconOnly?: boolean;
}

const IconButton: FC<IProps> = ({ Icon, disabled, withoutOutline, medium, small, danger, iconOnly, ...other }) => {
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
    })
  );

  return (
    <button {...other} className={classes}>
      <Icon className={iconClasses} />
    </button>
  );
};

export default IconButton;
