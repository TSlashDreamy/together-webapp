import { AppState } from "./redux/slices/appSlice";
import { IAppServices, IChat, IPlayer, ServiceStatus } from "./types";

export enum DBCollections {
  Users = "users",
  Rooms = "rooms",
}

export const DBCollectionToSlice = {
  [DBCollections.Users]: "user" as const,
  [DBCollections.Rooms]: "room" as const,
};

export const initialPlayerState: IPlayer = {
  next: null,
  queue: [],
  nowPlaying: null,
  isAutoplay: false,
  isLoading: false,
};

export const initialChatState: IChat = {
  messages: null,
};

export const initialSevicesState: IAppServices = {
  spotify: { token: null, status: ServiceStatus.Unactive },
  soundCloud: { token: null, status: ServiceStatus.Unactive },
  youTube: { token: null, status: ServiceStatus.Unactive },
};

export const initialAppState: AppState = {
  appearance: { floatingObjects: true },
  services: initialSevicesState,
};
