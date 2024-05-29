import { useEffect } from "react";

import { useUser } from "~/hooks/useUser";
import useWebsocket from "~/hooks/useWebsocket";
import { useAppDispatch } from "~/hooks/useRedux";

import { resetRoom, setChat, setHostUser, setPlayerId, setRoomId, setRoomName, setUsers } from "~/redux/slices/roomSlice";

import { getKey } from "~/utils";
import { DBCollections } from "~/constants";
import { IChat, IPerson, IRoom } from "~/types";

export const useRoomUpdates = () => {
  const { roomId } = useUser();
  const dispatch = useAppDispatch();

  /* //? Questionable way: IDK if this is a propper way to update each redux key independently (maybe there is a better way) */
  useWebsocket<string | null>(DBCollections.Rooms, roomId, setRoomName, getKey<IRoom, "roomName">("roomName"), undefined, null);
  useWebsocket<string | null>(DBCollections.Rooms, roomId, setHostUser, getKey<IRoom, "hostUser">("hostUser"), undefined, null);
  useWebsocket<IPerson[] | []>(DBCollections.Rooms, roomId, setUsers, getKey<IRoom, "users">("users"), undefined, []);
  useWebsocket<IChat>(DBCollections.Rooms, roomId, setChat, getKey<IRoom, "chat">("chat"));
  useWebsocket<string | null>(DBCollections.Rooms, roomId, setPlayerId, getKey<IRoom, "playerId">("playerId"), undefined, null);
  useWebsocket<string | null>(DBCollections.Rooms, roomId, setRoomId, getKey<IRoom, "roomId">("roomId"), undefined, null);
  /* //? ~Questionable way~ */

  useEffect(() => {
    if (!roomId) dispatch(resetRoom());
  }, [dispatch, roomId]);
};
