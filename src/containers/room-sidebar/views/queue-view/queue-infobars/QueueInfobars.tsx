import { ChangeEvent, FC } from "react";
import { HiOutlinePlusSmall as AddIcon } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Typography from "~/components/typography";
import Switch from "~/components/switch";
import IconButton from "~/components/icon-button";

import { usePlayer } from "~/hooks/usePlayer";

import { ISpotifyTrack } from "~/types";
import * as S from "./styles";
import { routes } from "~/router/constants";

interface IProps {
  queue: ISpotifyTrack[];
}

const QueueInfobars: FC<IProps> = ({ queue }) => {
  const navigate = useNavigate();
  const { switchAutoplay, isAutoplay } = usePlayer();

  const handleSwitchAutoplay = (e: ChangeEvent<HTMLInputElement>) => {
    switchAutoplay(e.target.checked);
  };

  return (
    <>
      <div className={S.actionBlockWrapper}>
        <Typography.SPAN className="font-normal">Autoplay</Typography.SPAN>
        <Switch onChange={handleSwitchAutoplay} checked={isAutoplay} />
      </div>
      <div className={S.actionBlockWrapper}>
        <Typography.SPAN className="font-normal">{queue && queue.length > 0 ? `${queue.length} in queue` : "Empty"}</Typography.SPAN>
        <IconButton small Icon={AddIcon} onClick={() => navigate(routes.app.search)} />
      </div>
    </>
  );
};

export default QueueInfobars;
