import { FC, useMemo } from "react";
import { IconType } from "react-icons";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";

import PlayIcon from "~/assets/icons/etc-icons/play.svg?react";
import { ContentsType } from "~/types";
import { contents } from "./constants";
import * as S from "./styles";

interface IProps {
  onPlay: () => void;
  author: string;
  contentType: ContentsType;
  ButtonIcon?: IconType | FC;
  isLoading?: boolean;
}

const CardActions: FC<IProps> = ({ onPlay, author, contentType, ButtonIcon, isLoading }) => {
  const { contentName, Icon } = useMemo(() => contents[contentType], [contentType]);

  return (
    <div className={S.wrapperStyle}>
      <IconButton small Icon={ButtonIcon || PlayIcon} isLoading={isLoading} onClick={onPlay} className={S.buttonStyle} />
      <div className={S.contentDescriptionStyle}>
        <Typography.SPAN className={S.authorStyle}>{author}</Typography.SPAN>
        <div className={S.typeWrapperStyle}>
          <Icon className={S.iconStyle} />
          <Typography.SPAN className={S.nameStyle}>{contentName}</Typography.SPAN>
        </div>
      </div>
    </div>
  );
};

export default CardActions;
