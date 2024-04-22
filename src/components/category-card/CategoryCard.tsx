import classNames from "classnames";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon: FC | IconType;
  cardNum: number;
  description: string;
  borderStyle: string;
  bgStyle: string;
  disabled?: boolean;
}

const CategoryCard: FC<IProps> = ({ Icon, cardNum, description, borderStyle, bgStyle, disabled, ...other }) => {
  const classes = twMerge(
    classNames(
      "xl:gap-[2.6vw] xl:px-[2.6vw] xl:py-[3.6vw] xl:w-[21.5vw] xl:rounded-[1.8vw]",
      `flex flex-col gap-[50px] px-[50px] py-[70px] w-[410px] border-[3px] ${borderStyle} rounded-[35px] transition-all`,
      `${bgStyle} group`,
      other.className,
      {
        "opacity-50": disabled,
      }
    )
  );

  const formatNumber = (num: number) => {
    return num < 9 ? `0${num}` : num;
  };

  const autoScroll = () => {
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <div onMouseEnter={autoScroll} className={classes}>
      <Icon className="size-[60px] group-hover:fill-black" />
      <div className="flex flex-col gap-[5px]">
        <Typography.SPAN className="mx-0 group-hover:text-black group-hover:mx-[25%] group-hover:opacity-50 group-hover:text-[128px] transition-all">
          {formatNumber(cardNum)}.
        </Typography.SPAN>
        <div className="flex items-center relative after:w-0 after:h-[3px] group-hover:after:w-full group-hover:after:bg-black group-hover:after:absolute group-hover:after:left-1/2 group-hover:after:translate-x-[-50%] group-hover:after:-bottom-3 group-hover:after:transition-all">
          <Typography.H3 className="leading-[1.2] group-hover:text-black">{description}</Typography.H3>
          <IconButton
            className="opacity-0 border-black text-black group-hover:opacity-100 transition-all"
            disabled={disabled}
            Icon={ArrowIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
