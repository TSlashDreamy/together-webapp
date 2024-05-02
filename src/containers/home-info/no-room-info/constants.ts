import { Room } from "~/types";

export const initialRoomState: Room = {
  roomId: "",
  roomName: "",
  nowPlaying: null,
  next: null,
  queue: [],
  users: [],
  hostUser: null,
  contentType: null,
};
