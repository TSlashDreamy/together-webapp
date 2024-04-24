import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "~/types";

const initialState: User = {
  email: null,
  token: null,
  id: null,
  userName: null,
  lastLogin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.lastLogin = action.payload.lastLogin;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
      state.userName = null;
      state.lastLogin = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
