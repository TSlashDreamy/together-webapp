import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  isLoggingIn: boolean;
  restoringSession: boolean;
}

const initialState: NotificationState = {
  isLoggingIn: false,
  restoringSession: true,
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
    resetRestoringSession: (state) => {
      state.restoringSession = false;
    },
  },
});

export const { setLoggingIn, resetLoggingIn, resetRestoringSession } = authSlice.actions;
export default authSlice.reducer;
