import { FirebaseError } from "firebase/app";
import { useCallback } from "react";

import { showNotification } from "~/redux/slices/notificationSlice";
import { useAppDispatch } from "~/hooks/useRedux";
import { DBCollections } from "~/constants";
import { database } from "~/firebase";
import { NotificationType } from "~/types";

const useDatabase = () => {
  const dispatch = useAppDispatch();
  const { db, dbRef, dbChild, dbGet, dbSet, dbUpdate } = database;

  const _handleDBError = useCallback(
    (e: unknown) => {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Database)",
        })
      );
    },
    [dispatch]
  );

  const getData = useCallback(
    async (collection: DBCollections, id: string) => {
      try {
        const snapshot = await dbGet(dbChild(dbRef(db), `${collection}/${id}`));
        if (snapshot.exists()) {
          return snapshot.val();
        }
      } catch (e) {
        _handleDBError(e);
      }
    },
    [_handleDBError, db, dbChild, dbGet, dbRef]
  );

  const pushData = useCallback(
    async <T>(collection: DBCollections, dataToPush: T, id: string) => {
      try {
        await dbSet(dbRef(db, `${collection}/${id}`), dataToPush);
      } catch (e) {
        _handleDBError(e);
      }
    },
    [_handleDBError, db, dbRef, dbSet]
  );

  const updateData = useCallback(
    async <T>(collection: DBCollections, dataToUpdate: T, id: string, updatedValue?: string) => {
      try {
        const updates = {
          [`${collection}/${id}${updatedValue ? `/${updatedValue}` : ""}`]: dataToUpdate,
        };

        await dbUpdate(dbRef(db), updates);
      } catch (e) {
        _handleDBError(e);
      }
    },
    [_handleDBError, db, dbRef, dbUpdate]
  );

  return {
    getData,
    pushData,
    updateData,
  };
};

export default useDatabase;
