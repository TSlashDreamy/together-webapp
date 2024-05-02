import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import SectionHeading from "~/components/section-heading";
import PlayIcon from "~/assets/icons/etc-icons/play.svg?react";
import NextIcon from "~/assets/icons/etc-icons/skip.svg?react";
import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";

import useRoom from "~/hooks/useRoom";

import { generateInfoCards } from "./utils";
import * as S from "../styles";

interface IProps {
  roomId: string;
}

const CreatedRoomInfo: FC<IProps> = ({ roomId }) => {
  const navigate = useNavigate();
  const { isIAmTheHost, roomRoute, roomName, nowPlaying, next, queue, users } = useRoom(roomId);

  const cards = useMemo(
    () => [
      {
        Icon: PlayIcon,
        name: "Now Playing",
        description: nowPlaying || "...",
        actionBtn: { action: () => null, name: "Skip", disabled: Boolean(!nowPlaying) },
      },
      {
        Icon: NextIcon,
        name: "Next",
        description: next || "...",
      },
      {
        Icon: QueueIcon,
        name: "In queue",
        description: queue && queue.length > 0 ? `${queue!.length} items` : `Empty`,
      },
      {
        Icon: PeopleIcon,
        name: "People in room",
        description: users && users.length > 1 ? `${users!.length} people` : `Only you are here`,
      },
    ],
    [next, nowPlaying, queue, users]
  );

  return (
    <>
      <SectionHeading
        title={`${isIAmTheHost ? "Your room" : roomName}`}
        button={{ name: "Open room", onClick: () => navigate(roomRoute) }}
      />
      <div className={S.cardWrapperStyle}>{generateInfoCards(cards)}</div>
    </>
  );
};

export default CreatedRoomInfo;
