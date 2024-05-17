import { useUserUpdates } from "~/hooks/websocket-updates/useUserUpdates";
import { useRoomUpdates } from "~/hooks/websocket-updates/useRoomUpdates";
import { usePlayerUpdates } from "~/hooks/websocket-updates/usePlayerUpdates";
import { useHistoryUpdates } from "~/hooks/websocket-updates/useHistoryUpdates";

export const useWebSocketUpdates = () => {
  /* ====== User updates ====== */
  useUserUpdates();

  /* ====== Room updates ====== */
  useRoomUpdates();

  /* ====== Player updates ====== */
  usePlayerUpdates();

  /* ====== History updates ====== */
  useHistoryUpdates();
};
