import { FC, HTMLAttributes } from "react";

import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import * as S from './styles';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const SectionWrapper: FC<IProps> = ({ name, children }) => {
  return (
    <CardWrapper className={S.card}>
      <Typography.H3>{name}</Typography.H3>
      <div className={S.optionsWrapper}>
        {children}
      </div>
    </CardWrapper>
  );
};

export default SectionWrapper;
