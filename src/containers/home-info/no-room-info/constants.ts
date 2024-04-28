import { Room } from "~/types";
import { getRandomNum } from "~/utils";

export const initialRoomState: Room = {
  roomId: String(Date.now()).concat(getRandomNum(10, 100000).toString()),
  nowPlaying: null,
  next: null,
  queue: [],
  users: [],
  contentType: null,
};
