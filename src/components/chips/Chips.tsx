import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon: FC | IconType;
  isActive: boolean;
}

const Chips: FC<IProps> = ({ Icon, isActive }) => {
  const classes = twMerge(
    classNames(
      "flex justify-center w-full px-[30px] py-[10px] bg-transparent border-[1px] border-text-white text-text-white rounded-[15px] cursor-pointer transition-all",
      {
        "bg-primary-chips border-0": isActive,
      }
    )
  );
  const iconClass = twMerge(classNames("size-[25px]", { "fill-text-light": isActive }));
  
  return (
    <div className={classes}>
      <Icon className={iconClass} />
    </div>
  );
};

export default Chips;
