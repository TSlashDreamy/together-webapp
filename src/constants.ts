import { AppState } from "./redux/slices/appSlice";
import { initialSevicesState } from "./services/constants";
import { IChat, IFirebasePlayer, IPlayer } from "./types";

export enum DBCollections {
  Users = "users",
  Rooms = "rooms",
  Players = "players",
}

export const DBCollectionToSlice = {
  [DBCollections.Users]: "user" as const,
  [DBCollections.Rooms]: "room" as const,
  [DBCollections.Players]: "player" as const,
};

export enum ModalType {
  CONFIRM = "CONFIRM",
  CONTENT = "CONTENT",
}

export enum NotificationCounterType {
  ACTION = "ACTION",
  ATTENTION = "ATTENTION",
  NEUTRAL = "NEUTRAL",
}

export const initalFirebasePlayerState: IFirebasePlayer = {
  id: "",
  nowPlaying: null,
  next: null,
  queue: [],
  lastSeekTimestamp: null,
  isAutoplay: true,
  isPlaying: false,
};

export const initialPlayerState: IPlayer = {
  ...initalFirebasePlayerState,
  currentDuration: null,
  isLoading: false,
  volume: 0,
};

export const initialChatState: IChat = {
  messages: null,
};

export const initialAppState: Omit<AppState, "servicesHealth"> = {
  appearance: { floatingObjects: true },
  services: initialSevicesState,
};
