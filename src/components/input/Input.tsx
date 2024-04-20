import { FC, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  type: HTMLInputTypeAttribute;
}

const Input: FC<IProps> = ({ error, ...other }) => {
  const classes = twMerge(
    classNames(other.className, ...S.inputStyles, {
      [S.inputErrorStyle]: Boolean(error),
    })
  );

  return (
    <div className={S.wrapperStyle}>
      <input className={classes} {...other} />
      {error && <span className={S.errorTextStyle}>{error}</span>}
    </div>
  );
};

export default Input;
