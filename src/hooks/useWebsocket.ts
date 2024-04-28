import { useEffect, useState } from "react";
import { DBCollections } from "~/constants";
import { database } from "~/firebase";

const useWebsocket = <T>(collection: DBCollections, id: string) => {
  const [data, setData] = useState<T | null>(null);
  const { db, dbRef, dbOnValue } = database;

  useEffect(() => {
    const unsub = dbOnValue(dbRef(db, `${collection}/${id}`), (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });

    return () => {
      unsub();
    };
  }, [collection, db, dbOnValue, dbRef, id]);

  return { data };
};

export default useWebsocket;
