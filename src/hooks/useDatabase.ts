import { FirebaseError } from "firebase/app";
import { useCallback } from "react";

import { showNotification } from "~/redux/slices/notificationSlice";
import { useAppDispatch } from "~/hooks/useRedux";
import { DBCollections } from "~/constants";
import { database } from "~/firebase";
import { NotificationType } from "~/types";

const useDatabase = () => {
  const dispatch = useAppDispatch();
  const { db, dbRef, dbChild, dbGet, dbSet, dbUpdate, dbRemove } = database;

  const _handleDBError = useCallback(
    (e: unknown) => {
      console.error("(E) Database: \n", e);
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
    async <T>(collection: DBCollections, id: string, path?: string): Promise<T | undefined> => {
      try {
        const snapshot = await dbGet(dbChild(dbRef(db), `${collection}/${id}${path ? "/".concat(path) : ""}`));
        if (snapshot.exists()) {
          return snapshot.val() as T;
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
    async <T>(collection: DBCollections, dataToUpdate: T | null, id: string, path?: string) => {
      try {
        const updates = {
          [`${collection}/${id}${path ? `/${path}` : ""}`]: dataToUpdate,
        };

        await dbUpdate(dbRef(db), updates);
      } catch (e) {
        _handleDBError(e);
      }
    },
    [_handleDBError, db, dbRef, dbUpdate]
  );

  const removeData = useCallback(
    async (collection: DBCollections, id: string, path?: string) => {
      try {
        await dbRemove(dbRef(db, `${collection}/${id}${path ? "/".concat(path) : ""}`));
      } catch (e) {
        _handleDBError(e);
      }
    },
    [_handleDBError, db, dbRef, dbRemove]
  );

  return {
    getData,
    pushData,
    updateData,
    removeData,
  };
};

export default useDatabase;
