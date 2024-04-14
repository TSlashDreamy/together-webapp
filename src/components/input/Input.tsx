import { FC, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { inputStyles } from "./styles";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  type: HTMLInputTypeAttribute;
}

const Input: FC<IProps> = ({ error, ...other }) => {
  const classes = twMerge(classNames(other.className, ...inputStyles));

  return (
    <>
      <input className={classes} {...other} />
      {error && <span>{error}</span>}
    </>
  );
};

export default Input;
