import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { removeUser } from "./userSlice";

import { initialPlayerState } from "~/constants";
import { IFirebasePlayer, IPlayer, ISpotifyTrack } from "~/types";

interface PlayerState extends IPlayer {}

const initialState: PlayerState = {
  ...initialPlayerState,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<IFirebasePlayer>) => {
      state.id = action.payload.id;
      state.currentDuration = 0;
      state.isAutoplay = action.payload.isAutoplay;
      state.isLoading = false;
      state.isPlaying = action.payload.isPlaying;
      state.lastSeekTimestamp = action.payload.lastSeekTimestamp;
      state.next = action.payload.next;
      state.nowPlaying = action.payload.nowPlaying;
      state.queue = action.payload.queue;
      state.volume = 50;
    },
    resetPlayer: () => initialPlayerState,
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCurrentDuration: (state, action: PayloadAction<number>) => {
      state.currentDuration = action.payload;
    },
    resetCurrentDuration: (state) => {
      state.currentDuration = 0;
    },
    setAutoplay: (state, action: PayloadAction<boolean>) => {
      state.isAutoplay = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setLastSeekTimestamp: (state, action: PayloadAction<number>) => {
      state.lastSeekTimestamp = action.payload;
    },
    setNext: (state, action: PayloadAction<ISpotifyTrack | null>) => {
      state.next = action.payload;
    },
    setNowPlaying: (state, action: PayloadAction<ISpotifyTrack | null>) => {
      state.nowPlaying = action.payload;
    },
    setQueue: (state, action: PayloadAction<ISpotifyTrack[]>) => {
      state.queue = action.payload;
    },
    addToQueue: (state, action: PayloadAction<ISpotifyTrack>) => {
      state.queue = [...state.queue, action.payload];
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(removeUser, () => {
      return initialState;
    });
  },
});

export const {
  setPlayer,
  resetPlayer,
  setIsLoading,
  resetIsLoading,
  addToQueue,
  setNext,
  setNowPlaying,
  setCurrentDuration,
  resetCurrentDuration,
  setVolume,
  setAutoplay,
  setId,
  setIsPlaying,
  setLastSeekTimestamp,
  setQueue,
} = playerSlice.actions;
export default playerSlice.reducer;
