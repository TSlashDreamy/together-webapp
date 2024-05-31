import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPerson, IRoomInvite, ISpotifyTrack, IUser } from "~/types";

const initialState: IUser = {
  email: null,
  token: null,
  uid: null,
  userName: null,
  lastLogin: null,
  roomId: null,
  outFriendsRequest: null,
  friendsRequest: null,
  friends: null,
  roomInvites: null,
  likedContent: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.userName = action.payload.userName;
      state.lastLogin = action.payload.lastLogin;
      state.outFriendsRequest = action.payload.outFriendsRequest;
      state.friendsRequest = action.payload.friendsRequest;
      state.friends = action.payload.friends;
      state.roomInvites = action.payload.roomInvites;
      state.likedContent = action.payload.likedContent;
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.userName = action.payload.userName;
      state.lastLogin = action.payload.lastLogin;
      state.roomId = action.payload.roomId;
    },
    removeUser: () => initialState,
    setRoomId: (state, action: PayloadAction<string | null>) => {
      state.roomId = action.payload;
    },
    setOutFriendsRequest: (state, action: PayloadAction<IPerson[] | null>) => {
      state.outFriendsRequest = action.payload;
    },
    setFriendsRequest: (state, action: PayloadAction<IPerson[] | null>) => {
      state.friendsRequest = action.payload;
    },
    setFriends: (state, action: PayloadAction<IPerson[] | null>) => {
      state.friends = action.payload;
    },
    setRoomInvites: (state, action: PayloadAction<IRoomInvite[] | null>) => {
      state.roomInvites = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
    },
    setLikedContent: (state, action: PayloadAction<ISpotifyTrack[] | null>) => {
      state.likedContent = action.payload;
    },
    setLastLogin: (state, action: PayloadAction<number | null>) => {
      state.lastLogin = action.payload;
    },
  },
});

export const {
  setUser,
  updateUser,
  removeUser,
  setRoomId,
  setOutFriendsRequest,
  setFriendsRequest,
  setFriends,
  setRoomInvites,
  setEmail,
  setUid,
  setLastLogin,
  setLikedContent,
  setUserName,
} = userSlice.actions;
export default userSlice.reducer;
