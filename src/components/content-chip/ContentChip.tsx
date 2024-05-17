import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import AllIcon from "~/assets/icons/content-icons/allBlend.svg?react";
import { SearchChips } from "~/pages/search/top-bar/constants";
import * as S from "./styles";

interface IProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  style: { wrapper: string; icon: string; active: string };
  Icon: FC | IconType;
  active?: boolean;
  name: string;
}

const ContentChip: FC<IProps> = ({ style, Icon, disabled, active, name, ...other }) => {
  const activeStyle = twMerge(style.active, "border-transparent");
  const classes = twMerge(
    classNames(S.wrapper, style.wrapper, {
      "opacity-50 pointer-events-none": disabled,
      [activeStyle]: active,
    })
  );
  const iconClasses = twMerge(classNames(S.icon, style.icon, { [S.activeIcon]: active }));

  return (
    <button {...other} className={classes} disabled={disabled}>
      {active && name === SearchChips.All ? <AllIcon className={iconClasses} /> : <Icon className={iconClasses} />}
    </button>
  );
};

export default ContentChip;
