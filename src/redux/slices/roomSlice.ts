import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IChat, IPerson, IPlayer, IRoom } from "~/types";
import { initialChatState, initialPlayerState } from "~/constants";
import { removeUser } from "./userSlice";

interface RoomState {
  roomId: string | null;
  roomName: string | null;
  hostUser: string | null;
  isLoading: boolean;
  users: IPerson[];
  chat: IChat;
  player: IPlayer;
}

const initialState: RoomState = {
  roomId: null,
  roomName: null,
  hostUser: null,
  isLoading: false,
  users: [],
  chat: { messages: null },
  player: initialPlayerState,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<IRoom>) => {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
      state.hostUser = action.payload.hostUser;
      state.users = action.payload.users;
      state.chat = action.payload.chat;
      state.player = action.payload.player;
    },
    resetRoom: (state) => {
      state.roomId = null;
      state.roomName = null;
      state.hostUser = null;
      state.users = [];
      state.chat = initialChatState;
      state.player = initialPlayerState;
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

  extraReducers: (builder) => {
    builder.addCase(removeUser, () => {
      return initialState;
    });
  },
});

export const { setRoom, resetRoom, setIsLoading, resetIsLoading, setPlayerLoading, resetPlayerLoading } =
  roomSlice.actions;
export default roomSlice.reducer;
