import { FC } from "react";

import CardService from "./card-service";
import CardName from "./card-name";
import CardActions from "./card-actions";

import * as S from "./styles";

const CardDescription: FC = () => {
  return (
    <div className={S.wrapperStyle}>
      <div className={S.hiddenWrapperStyle}>
        <CardService service={"Spotify"} />
        <hr className={S.hiddenDividerStyle} />
        <CardName name="Summer" length="2:34" />
      </div>
      <hr className={S.dividerStyle} />
      <CardActions author="Izzamuzzic" contentType="Music" onPlay={() => null} />
    </div>
  );
};

export default CardDescription;
