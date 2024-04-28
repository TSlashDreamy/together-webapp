import { FC } from "react";
import { useParams } from "react-router-dom";

import CardWrapper from "~/components/card-wrapper";

import useWebsocket from "~/hooks/useWebsocket";

import { DBCollections } from "~/constants";
import { Room } from "~/types";

const RoomPage: FC = () => {
  const { roomId } = useParams();
  const { data } = useWebsocket<Room>(DBCollections.Rooms, roomId as string);

  return (
    <CardWrapper>
      <div className="flex flex-col text-text-white items-center gap-5">
        <div>Room num: {roomId}</div>
        <div>Users: {data?.users ? data.users : "No users here"}</div>
        <div>Now playing: {data?.nowPlaying ? data.nowPlaying : "Nothing is playing now"}</div>
        <div>Next: {data?.next ? data.next : "Nothing next"}</div>
      </div>
    </CardWrapper>
  );
};

export default RoomPage;
