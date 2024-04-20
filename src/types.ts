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

export type RequestFunction<Response, Params = undefined> = (
  params?: Params
) => Promise<AxiosResponse<Response>>;
