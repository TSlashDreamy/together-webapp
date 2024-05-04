import { AxiosResponse } from "axios";

export enum InputTypes {
  Password = "password",
  Email = "email",
  Text = "text",
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

export enum Services {
  Spotify = "Spotify",
  SoundCloud = "SoundCloud",
  YouTube = "YouTube",
}

export interface IUser {
  email: string | null;
  token: string | null;
  uid: string | null;
  userName: string | null;
  lastLogin: number | null;
  roomId: string | null;
}

export interface IPlayer {
  next: string | null; // !TEMP
  queue: string[]; // !TEMP
  nowPlaying: string | null; // !TEMP
  isAutoplay: boolean;
  isLoading: boolean;
}

export interface IRoom {
  roomId: string;
  roomName: string;
  users: IPerson[];
  chat: IChat;
  hostUser: string | null;
  player: IPlayer;
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

export type RequestFunction<Response, Params = undefined> = (params?: Params) => Promise<AxiosResponse<Response>>;
export type ServicesType = keyof typeof Services;
export type ContentsType = keyof typeof Contents;
