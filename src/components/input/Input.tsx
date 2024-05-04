import { ChangeEvent, FC, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  type: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = ({ error, children, ...other }) => {
  const classes = twMerge(
    classNames(...S.inputStyles, other.className, {
      [S.inputErrorStyle]: Boolean(error),
    })
  );

  return (
    <div className={S.wrapperStyle}>
      <input {...other} className={classes} />
      {children && <div className="absolute -right-10 top-1/2 -translate-y-1/2">{children}</div>}
      {error && <span className={S.errorTextStyle}>{error}</span>}
    </div>
  );
};

export default Input;
