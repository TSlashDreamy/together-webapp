import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  hidden: boolean;
}

const Logo: FC<IProps> = ({ hidden, ...other }) => {
  const classes = twMerge(
    classNames(other.className, "flex gap-4 items-center font-light text-[32px] text-text-white opacity-100", {
      "opacity-0": hidden,
    })
  );

  return (
    <div className={classes}>
      {/* //! TEMP LOGO */}
      <div className="size-10 border-2 rounded-[10px]" />
      together
    </div>
  );
};

export default Logo;
