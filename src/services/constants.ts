import { IAppServices, ISpotifySecret } from "./types";

export enum Services {
  Spotify = "Spotify",
  SoundCloud = "SoundCloud",
  YouTube = "YouTube",
}

export enum ServiceStatus {
  Active = "Active",
  Unactive = "Unactive",
  Error = "Error",
}

export const spotifyInitialState: ISpotifySecret = {
  access_token: null,
  refresh_token: null,
  expires_in: null,
  status: ServiceStatus.Unactive,
};

export const spotifyErrorState = {
  spotify: { ...spotifyInitialState, status: ServiceStatus.Error },
} as IAppServices;

export const initialSevicesState: IAppServices = {
  spotify: spotifyInitialState,
  soundCloud: { token: null, status: ServiceStatus.Unactive },
  youTube: { token: null, status: ServiceStatus.Unactive },
};
