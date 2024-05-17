import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";
import authReducer from "./slices/authSlice";
import roomReducer from "./slices/roomSlice";
import playerReducer from "./slices/playerSlice";
import searchReducer from "./slices/searchSlice";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    notification: notificationReducer,
    authentication: authReducer,
    room: roomReducer,
    search: searchReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
