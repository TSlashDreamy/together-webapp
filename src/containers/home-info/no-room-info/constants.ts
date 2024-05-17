import { initialChatState } from "~/constants";
import { IRoom } from "~/types";

export const initialRoomState: IRoom = {
  roomId: "",
  roomName: "",
  users: [],
  hostUser: null,
  playerId: "",
  chat: initialChatState,
};
