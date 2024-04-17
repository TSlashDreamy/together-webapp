import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  isLoggingIn: boolean;
}

const initialState: NotificationState = {
  isLoggingIn: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLoggingIn: (state) => {
      state.isLoggingIn = true;
    },
    resetLoggingIn: (state) => {
      state.isLoggingIn = false;
    },
  },
});

export const { setLoggingIn, resetLoggingIn } = authSlice.actions;
export default authSlice.reducer;
