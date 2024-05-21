import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { removeUser } from "./userSlice";

import { initialChatState } from "~/constants";
import { IChat, IPerson, IRoom } from "~/types";

interface RoomState {
  roomId: string | null;
  roomName: string | null;
  hostUser: string | null;
  isLoading: boolean;
  users: IPerson[];
  chat: IChat;
  playerId: string | null;
}

const initialState: RoomState = {
  roomId: null,
  roomName: null,
  hostUser: null,
  isLoading: false,
  users: [],
  chat: initialChatState,
  playerId: null,
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
      state.playerId = action.payload.playerId;
    },
    resetRoom: (state) => {
      state.roomId = null;
      state.roomName = null;
      state.hostUser = null;
      state.users = [];
      state.chat = initialChatState;
      state.playerId = null;
    },
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
    setRoomId: (state, action: PayloadAction<string | null>) => {
      state.roomId = action.payload;
    },
    setRoomName: (state, action: PayloadAction<string | null>) => {
      state.roomName = action.payload;
    },
    setHostUser: (state, action: PayloadAction<string | null>) => {
      state.hostUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<IPerson[] | []>) => {
      state.users = action.payload;
    },
    setChat: (state, action: PayloadAction<IChat>) => {
      state.chat = action.payload;
    },
    setPlayerId: (state, action: PayloadAction<string | null>) => {
      state.playerId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(removeUser, () => {
      return initialState;
    });
  },
});

export const {
  setRoom,
  resetRoom,
  setIsLoading,
  resetIsLoading,
  setRoomId,
  setRoomName,
  setHostUser,
  setUsers,
  setChat,
  setPlayerId,
} = roomSlice.actions;
export default roomSlice.reducer;
