import { FC } from "react";

import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps {
  name: string;
  length: string;
}

const CardName: FC<IProps> = ({ name, length }) => {
  return (
    <div className={S.wrapperStyle}>
      <div>
        <Typography.SPAN className={S.nameStyle}>{name}</Typography.SPAN>
      </div>
      <Typography.SPAN className={S.lengthStyle}>{length}</Typography.SPAN>
    </div>
  );
};

export default CardName;
