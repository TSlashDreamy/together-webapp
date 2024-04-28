import { FC } from "react";
import { useParams } from "react-router-dom";

import CardWrapper from "~/components/card-wrapper";

import useRoom from "~/hooks/useRoom";

const RoomPage: FC = () => {
  const { roomId } = useParams();
  const { isIAmTheHost, hostUser, users, nowPlaying, next, isRoomExist } = useRoom(roomId as string);

  return (
    <CardWrapper>
      <div className="flex flex-col text-text-white items-center gap-5">
        <div>This room: {isRoomExist ? "Exist" : "DOES NOT EXIST!"}</div>
        <div>Room num: {roomId}</div>
        <div>Users: {users ? users.join(" | ") : "No users here"}</div>
        <div>Now playing: {nowPlaying || "Nothing is playing now"}</div>
        <div>Next: {next || "Nothing next"}</div>
        <div>Host: {isIAmTheHost ? "You are the host" : hostUser}</div>
      </div>
    </CardWrapper>
  );
};

export default RoomPage;
