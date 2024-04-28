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

export enum ContentType {
  Music = "music",
  Video = "video",
  Film = "film",
  Picture = "picture",
  Document = "document",
}

export interface User {
  email: string | null;
  token: string | null;
  uid: string | null;
  userName: string | null;
  lastLogin: number | null;
  roomId: string | null;
}

export interface Room {
  roomId: string;
  roomName: string;
  nowPlaying: string | null;
  next: string | null;
  queue: string[];
  users: string[];
  hostUser: string | null;
  contentType: ContentType | null;
}

export type RequestFunction<Response, Params = undefined> = (params?: Params) => Promise<AxiosResponse<Response>>;
