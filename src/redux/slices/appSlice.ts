import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { configKey } from "~/configuration/constants";
import { initialAppState } from "~/constants";
import { IAppServices, IServicesHealth } from "~/services/types";
import { IAppAppearance } from "~/types";

export interface AppState {
  appearance: IAppAppearance;
  services: IAppServices;
  servicesHealth: IServicesHealth;
}

const config = (JSON.parse(localStorage.getItem(configKey) as string) as AppState) || null;

const initialState: AppState = {
  ...(config || initialAppState),
  servicesHealth: { healthy: true, message: "" },
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
    setServiceHealth: (state, action: PayloadAction<IServicesHealth>) => {
      state.servicesHealth = action.payload;
    },
    resetServiceHealth: (state) => {
      state.servicesHealth = { healthy: true, message: "" };
    },
    resetConfig: () => ({ ...initialAppState, servicesHealth: { healthy: true, message: "" } }),
  },
});

export const {
  updateConfig,
  updateAppearance,
  updateServices,
  updateSpotify,
  updateSoundCloud,
  updateYouTube,
  setServiceHealth,
  resetServiceHealth,
  resetConfig,
} = appSlice.actions;
export default appSlice.reducer;
