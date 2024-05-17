import { FC } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import Typography from "~/components/typography";

import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import SkipIcon from "~/assets/icons/etc-icons/skip.svg?react";
import * as S from "./styles";

interface IProps {
  trackName: string;
  currentDuration: number;
  trackLength: number;
}

const NextBlock: FC<IProps> = ({ currentDuration, trackName, trackLength }) => {
  const classes = twMerge(
    classNames(S.skipInfoWrapperStyle, {
      [S.shown]: currentDuration >= (trackLength * 90) / 100,
      [S.hidden]: !(currentDuration >= (trackLength * 90) / 100),
    })
  );

  return (
    <div className={classes}>
      <div className={S.infoTextStyle}>
        <SkipIcon className={S.infoTitleIconStyle} />
        <Typography.H4>Next</Typography.H4>
      </div>
      <div className={S.infoTextStyle}>
        <MusicIcon className={S.infoDescriptionIconStyle} />
        <Typography.SPAN>{trackName}</Typography.SPAN>
      </div>
    </div>
  );
};

export default NextBlock;
