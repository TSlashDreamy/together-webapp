import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";
import authReducer from "./slices/authSlice";
import roomReducer from "./slices/roomSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    authentication: authReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
