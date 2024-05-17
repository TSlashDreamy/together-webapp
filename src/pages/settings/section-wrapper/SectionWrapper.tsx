import { FC, HTMLAttributes } from "react";

import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  message?: string;
}

const SectionWrapper: FC<IProps> = ({ name, message, children }) => {
  return (
    <CardWrapper className={S.card}>
      <div className={S.titleWrapper}>
        <Typography.H3>{name}</Typography.H3>
        {message && <Typography.SPAN className="opacity-50">{message}</Typography.SPAN>}
      </div>
      <div className={S.optionsWrapper}>{children}</div>
    </CardWrapper>
  );
};

export default SectionWrapper;
