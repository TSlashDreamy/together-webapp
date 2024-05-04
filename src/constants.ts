import { Player } from "./types";

export enum DBCollections {
  Users = "users",
  Rooms = "rooms",
}

export const DBCollectionToSlice = {
  [DBCollections.Users]: "user" as const,
  [DBCollections.Rooms]: "room" as const,
};

export const initialPlayerState: Player = {
  next: null,
  queue: [],
  nowPlaying: null,
  isAutoplay: false,
  isLoading: false,
};
