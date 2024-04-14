import { FC, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { inputStyles } from "./styles";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

const Input: FC<IProps> = ({ ...other }) => {
  const classes = twMerge(classNames(other.className, ...inputStyles));

  return <input className={classes} {...other} />;
};

export default Input;
