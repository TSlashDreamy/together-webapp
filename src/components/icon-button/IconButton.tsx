import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { RiProhibitedLine as ProhibitedIcon } from "react-icons/ri";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  Icon: FC | IconType;
  disabled?: boolean;
}

const IconButton: FC<IProps> = ({ Icon, disabled, ...other }) => {
  const classes = twMerge(
    classNames(
      "flex items-center justify-center px-[17px] py-[15px] border-[1px] border-text-white rounded-[20px] text-text-white transition-all",
      "hover:p-[17px] hover:rounded-[50px]",
      "active:scale-[0.9]",
      other.className,
      {
        "opacity-50 cursor-not-allowed hover:px-[17px] hover:py-[15px] hover:rounded-[20px]": disabled,
      }
    )
  );

  return (
    <button {...other} className={classes}>
      {disabled ? <ProhibitedIcon className="size-[25px]" /> : <Icon className="size-[25px]" />}
    </button>
  );
};

export default IconButton;
