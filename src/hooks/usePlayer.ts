import { useCallback } from "react";
import { FirebaseError } from "firebase/app";

import useRoom from "~/hooks/useRoom";
import { useAppDispatch } from "~/hooks/useRedux";

import { showNotification } from "~/redux/slices/notificationSlice";
import { NotificationType, IPlayer, IRoom } from "~/types";
import { resetPlayerLoading, setPlayerLoading } from "~/redux/slices/roomSlice";
import { DBCollections } from "~/constants";
import useDatabase from "./useDatabase";
import { getKey } from "~/utils";

export const usePlayer = () => {
  const { player, roomId } = useRoom();
  const { updateData } = useDatabase();
  const dispatch = useAppDispatch();

  const _handlePlayerError = useCallback(
    (e: unknown) => {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Player)",
        })
      );
    },
    [dispatch]
  );

  const switchAutoplay = async (state: boolean) => {
    try {
      dispatch(setPlayerLoading());

      await updateData(
        DBCollections.Rooms,
        state,
        roomId as string,
        getKey<IRoom, "player">("player").concat(`/${getKey<IPlayer, "isAutoplay">("isAutoplay")}`)
      );
    } catch (error) {
      _handlePlayerError(error);
    } finally {
      dispatch(resetPlayerLoading());
    }
  };

  return {
    switchAutoplay,
    ...player,
  }
};
