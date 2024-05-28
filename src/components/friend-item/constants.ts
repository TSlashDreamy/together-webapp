import { FriendStatus } from "~/types";

export const statusColors = {
  [FriendStatus.Pending]: "bg-status-pending",
  [FriendStatus.Online]: "bg-status-online",
  [FriendStatus.Offline]: "bg-status-offline",
  [FriendStatus.InARoom]: "bg-status-in-a-room",
};
