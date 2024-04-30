import { FC } from "react";
import { HiOutlinePlusSmall as AddIcon } from "react-icons/hi2";

import Chips from "~/components/chips";
import Typography from "~/components/typography";
import Switch from "~/components/switch";

import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";
import ChatIcon from "~/assets/icons/etc-icons/chat.svg?react";
import IconButton from "~/components/icon-button";
import ContentCard from "~/components/content-card";

const RoomSidebar: FC = () => {
  return (
    <div className="flex flex-col gap-[25px] px-[30px] py-[10px] h-full">
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[15px] w-full">
          <Chips Icon={QueueIcon} isActive={true} />
          <Chips Icon={PeopleIcon} isActive={false} />
          <Chips Icon={ChatIcon} isActive={false} />
        </div>
        <div className="flex items-center justify-between px-[26px] py-[12px] w-full bg-foreground rounded-[10px]">
          <Typography.SPAN className="font-normal">Autoplay</Typography.SPAN>
          <Switch />
        </div>
        <div className="flex items-center justify-between px-[26px] py-[12px] w-full bg-foreground rounded-[10px]">
          <Typography.SPAN className="font-normal">12 in queue</Typography.SPAN>
          <IconButton small Icon={AddIcon} />
        </div>
      </div>
      <div className="flex flex-col gap-[20px] overflow-scroll">
        <ContentCard />
        <ContentCard />
        <ContentCard />
      </div>
    </div>
  );
};

export default RoomSidebar;
