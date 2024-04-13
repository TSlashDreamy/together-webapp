import { FC, HTMLAttributes, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLInputElement> {
    placeholder: string
    type: HTMLInputTypeAttribute
}

const Input: FC<IProps> = ({ ...other }) => {
  const classes = twMerge(
    classNames(
      other.className,
      "min-w-[500px] p-[15px] rounded-[15px] border-[1px] border-text-white bg-transparent font-extralight text-[20px] text-text-white-transparent transition-all outline-0",
      "hover:font-normal",
      "active:border-4",
      "focus:border-primary focus:font-normal focus:text-primary focus:placeholder:text-primary"
    )
  );

  return <input className={classes} {...other} />;
};

export default Input;
