import { FC } from "react";

import InfoCard from "~/components/info-card/InfoCard";
import SectionHeading from "~/components/section-heading";
import PlayIcon from "~/assets/icons/etc-icons/play.svg?react";
import NextIcon from "~/assets/icons/etc-icons/skip.svg?react";
import QueueIcon from "~/assets/icons/etc-icons/queue.svg?react";
import PeopleIcon from "~/assets/icons/etc-icons/people.svg?react";
import { useAppSelector } from "~/hooks/useRedux";

import * as S from "../styles";

const CreatedRoomInfo: FC = () => {
  const { nowPlaying, next, queue, people } = useAppSelector((state) => state.room);

  return (
    <>
      <SectionHeading title="Your room" button={{ name: "Open room", action: () => null }} />
      <div className={S.cardWrapperStyle}>
        <InfoCard
          card={{ Icon: PlayIcon, name: "Now Playing", description: nowPlaying || "..." }}
          actionBtn={{ action: () => null, name: "Skip", disabled: Boolean(!nowPlaying) }}
        />
        <InfoCard card={{ Icon: NextIcon, name: "Next", description: next || "..." }} />
        <InfoCard
          card={{
            Icon: QueueIcon,
            name: "In queue",
            description: queue.length > 0 ? `${queue.length} items` : `Empty`,
          }}
        />
        <InfoCard
          card={{
            Icon: PeopleIcon,
            name: "People in room",
            description: people.length > 1 ? `${people.length} people` : `Only you are here`,
          }}
        />
      </div>
    </>
  );
};

export default CreatedRoomInfo;
