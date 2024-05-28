import { FC } from "react";
import { IconType } from "react-icons";

import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps {
  Icon: IconType | FC;
  title: string;
  description: string;
}

const SectionDescription: FC<IProps> = ({ Icon, description, title }) => {
  return (
    <div className={S.wrapper}>
      <div className={S.titleWrapper}>
        <Icon className={S.icon} />
        <Typography.H2 className={S.title}>{title}</Typography.H2>
      </div>
      <Typography.H4 className={S.description}>{description}</Typography.H4>
    </div>
  );
};

export default SectionDescription;
