import { FirebaseError } from "firebase/app";
import { User as FirebaseUser } from "firebase/auth";
import { useCallback } from "react";
import { database } from "~/firebase";
import { useAppDispatch } from "~/hooks/useRedux";
import { showNotification } from "~/redux/slices/notificationSlice";
import { setUser } from "~/redux/slices/userSlice";
import { NotificationType, User } from "~/types";

interface IUserPushData extends FirebaseUser {
  userName: string;
}

const useDatabase = () => {
  const dispatch = useAppDispatch();
  const { db, dbRef, dbChild, dbGet, dbSet } = database;

  const getUserData = useCallback(
    async (user: FirebaseUser | null) => {
      try {
        const snapshot = await dbGet(dbChild(dbRef(db), `users/${user?.uid}`));
        if (snapshot.exists()) {
          return snapshot.val() as Omit<User, "token">;
        }
      } catch (e) {
        dispatch(
          showNotification({
            type: NotificationType.Error,
            content: e instanceof FirebaseError ? e.message : "Something went wrong (Database)",
          })
        );
      }
    },
    [db, dbChild, dbGet, dbRef, dispatch]
  );

  const pushUserData = useCallback(
    async (userToPush: IUserPushData) => {
      try {
        const userData: Omit<User, "token"> = {
          id: userToPush.uid,
          email: userToPush.email,
          userName: userToPush.userName,
          lastLogin: Date.now(),
        };
        await dbSet(dbRef(db, "users/" + userData.id), userData);
        
        dispatch(
          setUser({
            ...userData,
            token: userToPush.refreshToken,
          })
        );
      } catch (e) {
        dispatch(
          showNotification({
            type: NotificationType.Error,
            content: e instanceof FirebaseError ? e.message : "Something went wrong (Database)",
          })
        );
      }
    },
    [db, dbRef, dbSet, dispatch]
  );

  return {
    getUserData,
    pushUserData,
  };
};

export default useDatabase;
