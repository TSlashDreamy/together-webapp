import { FC } from "react";

import IconButton from "~/components/icon-button";

import LikeIcon from "~/assets/icons/etc-icons/heart.svg?react";
import PlayIcon from "~/assets/icons/etc-icons/play.svg?react";
import VolumeIcon from "~/assets/icons/etc-icons/volume.svg?react";
import AddCollectionIcon from "~/assets/icons/etc-icons/addCollection.svg?react";
import SkipIcon from "~/assets/icons/etc-icons/skip.svg?react";
import * as S from "./styles";

const PlayerLeftSide: FC = () => {
  return (
    <div className={S.leftSideStyle}>
      <img className={S.musicCoverStyle} src="https://f4.bcbits.com/img/a2992416002_10.jpg" />
      <div className={S.buttonsContainerStyle}>
        <div className={S.buttonsWrapperStyle}>
          <IconButton Icon={PlayIcon} />
          <IconButton Icon={SkipIcon} withoutOutline />
          <IconButton Icon={VolumeIcon} withoutOutline disabled />
        </div>
        <div className={S.buttonsWrapperStyle}>
          <IconButton Icon={AddCollectionIcon} disabled />
          <IconButton Icon={LikeIcon} disabled />
        </div>
      </div>
      <div className={S.progressbarStyle} />
    </div>
  );
};

export default PlayerLeftSide;
