import { FC } from "react";
import { useParams } from "react-router-dom";

import RoomSidebar from "~/containers/room-sidebar";
import MusicPlayer from "~/containers/music-player";
import IconButton from "~/components/icon-button";
import CardWrapper from "~/components/card-wrapper";
import PageWrapper from "~/components/page-wrapper";
import SectionHeading from "~/components/section-heading";

import useRoom from "~/hooks/useRoom";

import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";
import LinkIcon from "~/assets/icons/etc-icons/link.svg?react";
import AddPersonIcon from "~/assets/icons/etc-icons/addPerson.svg?react";
import * as S from "./styles";

const RoomPage: FC = () => {
  const { roomId } = useParams();
  const { roomName, isIAmTheHost, hostUser, users, nowPlaying, next, isRoomExist } = useRoom(roomId as string);

  return (
    <PageWrapper>
      <div className="flex">
        <div className={S.contentSideStyle}>
          <SectionHeading
            Icon={RoomIcon}
            headingClassNames="font-normal"
            title={`${roomName}`}
            button={{ name: "Close room", action: () => null, danger: true }}
          >
            <IconButton Icon={LinkIcon} />
            <IconButton Icon={AddPersonIcon} />
          </SectionHeading>
          <MusicPlayer />
        </div>
        <RoomSidebar />
      </div>
      <CardWrapper>
        <div className="flex flex-col text-text-white items-center gap-5">
          <div>====DEBUG CARD====</div>
          <div>This room: {isRoomExist ? "Exist" : "DOES NOT EXIST!"}</div>
          <div>Room num: {roomId}</div>
          <div>Users: {users ? users.join(" | ") : "No users here"}</div>
          <div>Now playing: {nowPlaying || "Nothing is playing now"}</div>
          <div>Next: {next || "Nothing next"}</div>
          <div>Host: {isIAmTheHost ? "You are the host" : hostUser}</div>
        </div>
      </CardWrapper>
    </PageWrapper>
  );
};

export default RoomPage;
