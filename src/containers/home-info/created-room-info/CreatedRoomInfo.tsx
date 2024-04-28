import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import SectionHeading from "~/components/section-heading";
import PlayIcon from "~/assets/icons/etc-icons/play.svg?react";
import NextIcon from "~/assets/icons/etc-icons/skip.svg?react";
import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";

import { useAppSelector } from "~/hooks/useRedux";

import { generateInfoCards } from "./utils";
import { routes } from "~/router/constants";
import * as S from "../styles";

interface IProps {
  roomId: string;
}

const CreatedRoomInfo: FC<IProps> = ({ roomId }) => {
  const { nowPlaying, next, queue, users } = useAppSelector((state) => state.room);
  const navigate = useNavigate();
  const roomRoot = routes.app.room;

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
        description: queue.length > 0 ? `${queue.length} items` : `Empty`,
      },
      {
        Icon: PeopleIcon,
        name: "People in room",
        description: users.length > 1 ? `${users.length} people` : `Only you are here`,
      },
    ],
    [next, nowPlaying, queue.length, users.length]
  );

  return (
    <>
      <SectionHeading
        title="Your room"
        button={{ name: "Open room", action: () => navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`) }}
      />
      <div className={S.cardWrapperStyle}>{generateInfoCards(cards)}</div>
    </>
  );
};

export default CreatedRoomInfo;
