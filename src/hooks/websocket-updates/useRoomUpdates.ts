import { useUser } from "~/hooks/useUser";
import useWebsocket from "~/hooks/useWebsocket";

import { setChat, setHostUser, setPlayerId, setRoomId, setRoomName, setUsers } from "~/redux/slices/roomSlice";

import { getKey } from "~/utils";
import { DBCollections } from "~/constants";
import { IChat, IPerson, IRoom } from "~/types";

export const useRoomUpdates = () => {
  const { roomId } = useUser();

  /* //? Questionable way: IDK if this is a propper way to update each redux key independently (maybe there is a better way) */
  useWebsocket<string>(DBCollections.Rooms, roomId, setRoomId, getKey<IRoom, "roomId">("roomId"));
  useWebsocket<string>(DBCollections.Rooms, roomId, setRoomName, getKey<IRoom, "roomName">("roomName"));
  useWebsocket<IPerson[]>(DBCollections.Rooms, roomId, setUsers, getKey<IRoom, "users">("users"));
  useWebsocket<IChat>(DBCollections.Rooms, roomId, setChat, getKey<IRoom, "chat">("chat"));
  useWebsocket<string>(DBCollections.Rooms, roomId, setHostUser, getKey<IRoom, "hostUser">("hostUser"));
  useWebsocket<string>(DBCollections.Rooms, roomId, setPlayerId, getKey<IRoom, "playerId">("playerId"));
  /* //? ~Questionable way~ */
};
