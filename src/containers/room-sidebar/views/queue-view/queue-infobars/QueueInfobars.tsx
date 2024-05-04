import { ChangeEvent, FC } from "react";
import { HiOutlinePlusSmall as AddIcon } from "react-icons/hi2";

import Typography from "~/components/typography";
import Switch from "~/components/switch";
import IconButton from "~/components/icon-button";

import { usePlayer } from "~/hooks/usePlayer";

import * as S from "./styles";

interface IProps {
  queue: string[];
}

const QueueInfobars: FC<IProps> = ({ queue }) => {
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
        <Typography.SPAN className="font-normal">{queue ? `${queue.length} in queue` : "Empty"}</Typography.SPAN>
        <IconButton small Icon={AddIcon} />
      </div>
    </>
  );
};

export default QueueInfobars;
