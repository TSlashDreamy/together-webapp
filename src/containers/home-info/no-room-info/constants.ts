import { initialChatState, initialPlayerState } from "~/constants";
import { IRoom } from "~/types";

export const initialRoomState: IRoom = {
  roomId: "",
  roomName: "",
  users: [],
  hostUser: null,
  player: initialPlayerState,
  chat: initialChatState,
};
