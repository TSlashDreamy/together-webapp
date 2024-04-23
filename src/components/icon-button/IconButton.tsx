import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { RiProhibitedLine as ProhibitedIcon } from "react-icons/ri";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  Icon: FC | IconType;
  disabled?: boolean;
}

const IconButton: FC<IProps> = ({ Icon, disabled, ...other }) => {
  const classes = twMerge(
    classNames(S.iconButtonStyles, other.className, {
      [S.disabledStyle]: disabled,
    })
  );

  return (
    <button {...other} className={classes}>
      {disabled ? <ProhibitedIcon className={S.iconStyle} /> : <Icon className={S.iconStyle} />}
    </button>
  );
};

export default IconButton;
