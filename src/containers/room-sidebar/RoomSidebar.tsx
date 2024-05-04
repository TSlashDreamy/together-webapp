import { FC, useState } from "react";

import QueueView from "./views/queue-view";
import PeopleView from "./views/people-view";
import ChatView from "./views/chat-view";
import QueueInfobars from "./views/queue-view/queue-infobars";
import PeopleInfobars from "./views/people-view/people-infobars";
import Chips from "~/components/chips";

import { chips, SidebarChips } from "./constants";
import { IChat, IPerson } from "~/types";
import * as S from "./styles";

interface IProps {
  queue: string[];
  users: IPerson[];
  chat: IChat;
  hostUser: string;
  isAutoPlay: boolean;
}

const RoomSidebar: FC<IProps> = ({ queue, users, chat }) => {
  const [selectedTab, setSelectedTab] = useState<SidebarChips>(SidebarChips.Queue);

  return (
    <div className={S.wrapperStyle}>
      <div className={S.topContentWrapper}>
        <div className={S.chipsWrapper}>
          {chips.map((chip) => (
            <Chips
              key={chip.name}
              Icon={chip.Icon}
              isActive={chip.name === selectedTab}
              onClick={() => setSelectedTab(chip.name)}
            />
          ))}
        </div>
        {selectedTab === SidebarChips.Queue && <QueueInfobars queue={queue} />}
        {selectedTab === SidebarChips.People && <PeopleInfobars people={users} />}
      </div>
      {selectedTab === SidebarChips.Queue && <QueueView queue={queue} />}
      {selectedTab === SidebarChips.People && <PeopleView people={users} />}
      {selectedTab === SidebarChips.Chat && <ChatView chat={chat} />}
    </div>
  );
};

export default RoomSidebar;
