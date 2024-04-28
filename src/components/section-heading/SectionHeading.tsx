import { FC, HTMLAttributes } from "react";

import Button from "~/components/button";
import Typography from "~/components/typography";

import * as S from "./styles";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  Icon?: FC | IconType;
  headingClassNames?: string;
  title: string;
  button: { name: string; action: () => void; danger?: boolean; disabled?: boolean };
}

const SectionHeading: FC<IProps> = ({ Icon, title, headingClassNames, button, children, ...other }) => {
  const headingClasses = twMerge(S.headerStyle, headingClassNames);

  return (
    <div {...other} className={S.wrapperStyle}>
      <div className="flex items-center gap-[20px]">
        {Icon && <Icon className="size-[40px]"/>}
        <Typography.H2 className={headingClasses}>{title}</Typography.H2>
      </div>
      <div className="flex gap-[10px]">
        {children}
        <Button primary outline danger={button.danger} disabled={button.disabled} onClick={button.action}>
          {button.name}
        </Button>
      </div>
    </div>
  );
};

export default SectionHeading;
