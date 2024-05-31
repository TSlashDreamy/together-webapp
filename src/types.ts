import { AxiosResponse } from "axios";

export enum InputTypes {
  Password = "password",
  Email = "email",
  Text = "text",
  Range = "range",
}

export interface IMinMax {
  min: number;
  max: number;
}

export enum NotificationType {
  Error = "error",
  Warning = "warning",
  Success = "success",
  Information = "information",
}

export enum Contents {
  Music = "Music",
  Video = "Video",
  Film = "Film",
  Picture = "Picture",
  Document = "Document",
}

export interface IAppAppearance {
  floatingObjects: boolean;
}

export interface IRoomInvite {
  name: string;
  id: string;
}

export interface IUser {
  email: string | null;
  token: string | null;
  uid: string | null;
  userName: string | null;
  lastLogin: number | null;
  roomId: string | null;
  roomInvites: IRoomInvite[] | null;
  outFriendsRequest: IPerson[] | null; 
  friendsRequest: IPerson[] | null;
  friends: IPerson[] | null;
  likedContent: ISpotifyTrack[] | null;
}

export interface IPlayer {
  id: string | null;
  next: ISpotifyTrack | null;
  queue: ISpotifyTrack[];
  nowPlaying: ISpotifyTrack | null;
  lastSeekTimestamp: number | null;
  currentDuration: number | null;
  volume: number | null;
  isPlaying: boolean;
  isAutoplay: boolean;
  isLoading: boolean;
}

export interface IFirebasePlayer extends Omit<IPlayer, "isLoading" | "volume" | "currentDuration"> {}

export interface IRoom {
  roomId: string;
  roomName: string;
  users: IPerson[];
  chat: IChat;
  hostUser: string | null;
  playerId: string;
}

export interface IPerson {
  id: string;
  name: string;
}

export interface IMessage {
  user: IPerson;
  content: string;
}

export interface IChat {
  messages: IMessage[] | null;
}

export interface ISpotifyTrack {
  name: string;
  author: string;
  duration: number;
  image: string;
  trackUri: string;
  requestedBy: string;
}

export interface ISearchResult {
  songs: ISpotifyTrack[];
  next: string;
  total: number;
}

export enum FriendStatus {
  Pending = "Pending",
  Online = "Online",
  Offline = "Offline",
  InARoom = "In a room",
}

export type RequestFunction<Response, Params = undefined> = (params?: Params) => Promise<AxiosResponse<Response>>;
export type ContentsType = keyof typeof Contents;
