import { FC, HTMLAttributes } from "react";

import Button from "~/components/button";
import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  button: { name: string; action: () => void };
}

const SectionHeading: FC<IProps> = ({ title, button, ...other }) => {
  return (
    <div {...other} className={S.wrapperStyle}>
      <Typography.H2 className={S.headerStyle}>{title}</Typography.H2>
      <Button primary outline onClick={button.action}>
        {button.name}
      </Button>
    </div>
  );
};

export default SectionHeading;
