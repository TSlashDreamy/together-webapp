import { FC } from "react";
import { HiOutlinePlusSmall as AddIcon } from "react-icons/hi2";

import Chips from "~/components/chips";
import Typography from "~/components/typography";
import Switch from "~/components/switch";
import IconButton from "~/components/icon-button";
import ContentCard from "~/components/content-card";

import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";
import ChatIcon from "~/assets/icons/etc-icons/chat.svg?react";

import * as S from "./styles";

const RoomSidebar: FC = () => {
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
          <Switch />
        </div>
        <div className={S.actionBlockWrapper}>
          <Typography.SPAN className="font-normal">12 in queue</Typography.SPAN>
          <IconButton small Icon={AddIcon} />
        </div>
      </div>
      <div className={S.contentWrapper}>
        <ContentCard />
        <ContentCard />
        <ContentCard />
        <ContentCard />
      </div>
    </div>
  );
};

export default RoomSidebar;
