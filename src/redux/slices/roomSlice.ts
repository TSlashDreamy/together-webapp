import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Player, Room } from "~/types";
import { initialPlayerState } from "~/constants";

interface RoomState {
  roomId: string | null;
  roomName: string | null;
  hostUser: string | null;
  users: string[];
  isLoading: boolean;
  player: Player;
}

const initialState: RoomState = {
  roomId: null,
  roomName: null,
  hostUser: null,
  users: [],
  isLoading: false,
  player: initialPlayerState,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
      state.hostUser = action.payload.hostUser;
      state.users = action.payload.users;
      state.player = action.payload.player;
    },
    resetRoom: (state) => {
      state.roomId = null;
      state.roomName = null;
      state.hostUser = null;
      state.users = [];
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
    setPlayerLoading: (state) => {
      state.player.isLoading = true;
    },
    resetPlayerLoading: (state) => {
      state.player.isLoading = false;
    },
  },
});

export const { setRoom, resetRoom, setIsLoading, resetIsLoading, setPlayerLoading, resetPlayerLoading } =
  roomSlice.actions;
export default roomSlice.reducer;
