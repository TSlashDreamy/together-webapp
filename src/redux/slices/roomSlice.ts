import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contents } from "~/types";

interface RoomState {
  roomId: string | null;
  nowPlaying: string | null; // !TEMP
  next: string | null; // !TEMP
  queue: string[]; // !TEMP
  users: string[];
  contentType: Contents | null;
  isLoading: boolean;
}

const initialState: RoomState = {
  roomId: null,
  nowPlaying: null,
  next: null,
  queue: [],
  users: [],
  contentType: null,
  isLoading: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomState>) => {
      state.roomId = action.payload.roomId;
      state.nowPlaying = action.payload.nowPlaying;
      state.next = action.payload.next;
      state.queue = action.payload.queue;
      state.users = action.payload.users;
      state.contentType = action.payload.contentType;
    },
    resetRoom: (state) => {
      state.roomId = null;
      state.nowPlaying = null;
      state.next = null;
      state.queue = [];
      state.users = [];
      state.contentType = null;
    },
    setNext: (state, action: PayloadAction<RoomState>) => {
      state.nowPlaying = action.payload.nowPlaying;
      state.next = action.payload.next;
      state.queue = action.payload.queue;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setRoom, resetRoom, setNext, setIsLoading, resetIsLoading } = roomSlice.actions;
export default roomSlice.reducer;
