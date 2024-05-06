import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { configKey } from "~/configuration/constants";
import { initialAppState } from "~/constants";
import { IAppServices } from "~/services/types";
import { IAppAppearance } from "~/types";

export interface AppState {
  appearance: IAppAppearance;
  services: IAppServices;
}

const config = (JSON.parse(localStorage.getItem(configKey) as string) as AppState) || null;

const initialState: AppState = {
  ...(config || initialAppState),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<AppState>) => {
      state.appearance = action.payload.appearance;
      state.services = action.payload.services;
    },
    updateAppearance: (state, action: PayloadAction<IAppAppearance>) => {
      state.appearance = action.payload;
    },
    updateServices: (state, action: PayloadAction<IAppServices>) => {
      state.services = action.payload;
    },
    updateSpotify: (state, action: PayloadAction<IAppServices["spotify"]>) => {
      state.services.spotify = action.payload;
    },
    updateSoundCloud: (state, action: PayloadAction<IAppServices["soundCloud"]>) => {
      state.services.soundCloud = action.payload;
    },
    updateYouTube: (state, action: PayloadAction<IAppServices["youTube"]>) => {
      state.services.youTube = action.payload;
    },
    resetConfig: () => initialAppState,
  },
});

export const {
  updateConfig,
  updateAppearance,
  updateServices,
  updateSpotify,
  updateSoundCloud,
  updateYouTube,
  resetConfig,
} = appSlice.actions;
export default appSlice.reducer;
