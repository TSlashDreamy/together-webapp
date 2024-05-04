import { initialPlayerState } from "~/constants";
import { Room } from "~/types";

export const initialRoomState: Room = {
  roomId: "",
  roomName: "",
  users: [],
  hostUser: null,
  player: initialPlayerState,
};
