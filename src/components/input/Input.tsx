import { FC, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { inputStyles, wrapperStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  type: HTMLInputTypeAttribute;
}

const Input: FC<IProps> = ({ error, ...other }) => {
  const classes = twMerge(
    classNames(other.className, ...inputStyles, {
      "border-danger-600": Boolean(error),
    })
  );

  return (
    <div className={wrapperStyle}>
      <input className={classes} {...other} />
      {error && <span className="text-danger-600 px-0 font-light">{error}</span>}
    </div>
  );
};

export default Input;
