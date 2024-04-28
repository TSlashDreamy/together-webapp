import { FC } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";

import Typography from "~/components/typography";

import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import SkipIcon from "~/assets/icons/etc-icons/skip.svg?react";
import * as S from "./styles";

const PlayerRightSide: FC = () => {
  return (
    <div className={S.rightSideStyle}>
      <div className={S.serviceWrapper}>
        <Typography.SPAN>Playing from</Typography.SPAN>
        <SpotifyIcon className={S.serviceIconStyle} />
      </div>
      <div className={S.songDetailsStyle}>
        <div>
          <Typography.H3 className="font-medium">Apathy - loooooooooong name in this song</Typography.H3>
          <Typography.SPAN>Burning Time Machine</Typography.SPAN>
        </div>
        <Typography.H3 className="font-medium">1:02 / 3:14</Typography.H3>
      </div>
      {true && (
        <div className={S.skipInfoWrapperStyle}>
          <div className={S.infoTextStyle}>
            <SkipIcon className={S.infoTitleIconStyle} />
            <Typography.H4>Next</Typography.H4>
          </div>
          <div className={S.infoTextStyle}>
            <MusicIcon className={S.infoDescriptionIconStyle} />
            <Typography.SPAN>Artery - Burning time machine</Typography.SPAN>
          </div>
        </div>
      )}
      <Typography.SPAN className={S.requestedTextStyle}>Requested by: User</Typography.SPAN>
    </div>
  );
};

export default PlayerRightSide;
