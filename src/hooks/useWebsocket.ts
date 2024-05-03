import { useEffect } from "react";
import { DBCollections, DBCollectionToSlice } from "~/constants";
import { database } from "~/firebase";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { UnknownAction } from "@reduxjs/toolkit";

const useWebsocket = <T>(collection: DBCollections, id: string, actionCreator: (data: T) => UnknownAction) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state[DBCollectionToSlice[collection]]);
  const { db, dbRef, dbOnValue } = database;

  useEffect(() => {
    const unsub = dbOnValue(dbRef(db, `${collection}/${id}`), (snapshot) => {
      if (snapshot.exists()) {
        const webSocketData = snapshot.val();
        dispatch(actionCreator(webSocketData));
      }
    });

    return () => {
      unsub();
    };
  }, [actionCreator, collection, db, dbOnValue, dbRef, dispatch, id]);

  return { data };
};

export default useWebsocket;
