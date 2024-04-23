import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ContentType } from "~/types";

interface RoomState {
  roomId: string | null;
  nowPlaying: string | null; // !TEMP
  next: string | null; // !TEMP
  queue: string[]; // !TEMP
  people: string[]; // !TEMP
  contentType: ContentType | null;
}

const initialState: RoomState = {
  roomId: null,
  nowPlaying: null,
  next: null,
  queue: [],
  people: [],
  contentType: null,
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
      state.people = action.payload.people;
      state.contentType = action.payload.contentType;
    },
    resetRoom: (state) => {
      state.roomId = null;
      state.nowPlaying = null;
      state.next = null;
      state.queue = [];
      state.people = [];
      state.contentType = null;
    },
    setNext: (state, action: PayloadAction<RoomState>) => {
      state.nowPlaying = action.payload.nowPlaying;
      state.next = action.payload.next;
      state.queue = action.payload.queue;
    },
  },
});

export const { setRoom, resetRoom, setNext } = roomSlice.actions;
export default roomSlice.reducer;
