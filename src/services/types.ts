import { Services, ServiceStatus } from "./constants";

export interface IServiceState {
  token: string | null;
  status: ServiceStatus;
}

export interface ISpotifySecret {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: number | null;
  status: ServiceStatus;
}

export interface IAppServices {
  spotify: ISpotifySecret;
  soundCloud: IServiceState;
  youTube: IServiceState;
}

export type ServicesType = keyof typeof Services;
