import { useEffect } from "react";
import { UnknownAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";

import { database } from "~/firebase";
import { DBCollections, DBCollectionToSlice } from "~/constants";

const useWebsocket = <T>(
  collection: DBCollections,
  id: string | null,
  actionCreator: (data: T) => UnknownAction,
  path?: string,
  checks?: boolean,
  defaultValue?: T
) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state[DBCollectionToSlice[collection]]);
  const { db, dbRef, dbOnValue } = database;

  useEffect(() => {
    if (checks === false) return;
    if (!id) return;
    const listenPath = `${collection}/${id}${path ? "/".concat(path) : ""}`;
    const unsub = dbOnValue(dbRef(db, listenPath), (snapshot) => {
      if (snapshot.exists()) {
        const webSocketData = snapshot.val();
        dispatch(actionCreator(webSocketData));
      } else {
        dispatch(actionCreator(defaultValue as T));
      }
    });

    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionCreator, checks, collection, db, dbOnValue, dbRef, dispatch, id, path]);

  return { data };
};

export default useWebsocket;
