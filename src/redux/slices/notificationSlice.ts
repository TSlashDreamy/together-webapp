import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NotificationType } from "~/components/notification/types";

interface NotificationState {
  content: string | null;
  type: NotificationType | null;
}

const initialState: NotificationState = {
  content: null,
  type: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationState>) => {
      state.content = action.payload.content;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.content = null;
      state.type = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
