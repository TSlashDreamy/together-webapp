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
  button?: { name: string; onClick: () => void; danger?: boolean; disabled?: boolean; isLoading?: boolean };
}

const SectionHeading: FC<IProps> = ({ Icon, title, headingClassNames, button, children, ...other }) => {
  const headingClasses = twMerge(S.headerStyle, headingClassNames);

  return (
    <div {...other} className={S.wrapperStyle}>
      <div className={S.descriptionWrapper}>
        {Icon && <Icon className={S.icon} />}
        <Typography.H2 className={headingClasses}>{title}</Typography.H2>
      </div>
      <div className={S.buttonsWrapper}>
        {children}
        {button && (
          <Button primary outline {...button}>
            {button.name}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
