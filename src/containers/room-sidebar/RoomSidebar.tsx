import { ChangeEvent, FC } from "react";
import { HiOutlinePlusSmall as AddIcon } from "react-icons/hi2";

import Chips from "~/components/chips";
import Typography from "~/components/typography";
import Switch from "~/components/switch";
import IconButton from "~/components/icon-button";
import ContentCard from "~/components/content-card";
import CardWrapper from "~/components/card-wrapper";

import { usePlayer } from "~/hooks/usePlayer";

import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";
import ChatIcon from "~/assets/icons/etc-icons/chat.svg?react";

import * as S from "./styles";

interface IProps {
  queue: string[];
  users: string[];
  hostUser: string;
  isAutoPlay: boolean;
}

const RoomSidebar: FC<IProps> = ({ queue }) => {
  const { switchAutoplay, isAutoplay } = usePlayer();

  const handleSwitchAutoplay = (e: ChangeEvent<HTMLInputElement>) => {
    switchAutoplay(e.target.checked);
  };

  return (
    <div className={S.wrapperStyle}>
      <div className={S.topContentWrapper}>
        <div className={S.chipsWrapper}>
          <Chips Icon={QueueIcon} isActive={true} />
          <Chips Icon={PeopleIcon} isActive={false} />
          <Chips Icon={ChatIcon} isActive={false} />
        </div>
        <div className={S.actionBlockWrapper}>
          <Typography.SPAN className="font-normal">Autoplay</Typography.SPAN>
          <Switch onChange={handleSwitchAutoplay} checked={isAutoplay} />
        </div>
        <div className={S.actionBlockWrapper}>
          <Typography.SPAN className="font-normal">{queue ? `${queue.length} in queue` : "Empty"}</Typography.SPAN>
          <IconButton small Icon={AddIcon} />
        </div>
      </div>
      <div className={S.contentWrapper}>
        {queue ? (
          queue.map(() => <ContentCard />)
        ) : (
          <CardWrapper>
            <Typography.SPAN>Add something</Typography.SPAN>{" "}
          </CardWrapper>
        )}
      </div>
    </div>
  );
};

export default RoomSidebar;
