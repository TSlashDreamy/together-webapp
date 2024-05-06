import { useCallback, useEffect } from "react";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "./useRedux";
import { auth } from "~/firebase";
import { removeUser, setUser } from "~/redux/slices/userSlice";
import { resetLoggingIn, resetRestoringSession, setLoggingIn } from "~/redux/slices/authSlice";
import useDatabase from "./useDatabase";
import { DBCollections } from "~/constants";

export const useAuth = () => {
  const { email, token, uid, userName } = useAppSelector((state) => state.user);
  const { isLoggingIn, restoringSession } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();
  const { getData } = useDatabase();

  const signUserOut = useCallback(async () => {
    dispatch(setLoggingIn());
    await signOut(auth);
    dispatch(removeUser());
    dispatch(resetLoggingIn());
  }, [dispatch]);

  const checkUserExistance = useCallback(
    async (user: FirebaseUser) => {
      const userData = await getData(DBCollections.Users, user.uid);
      if (userData && !uid) {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            token: user.refreshToken,
            userName: userData.userName,
            lastLogin: userData.lastLogin,
            roomId: null,
          })
        );
      }
      if (!userData && uid) dispatch(removeUser());
      restoringSession && dispatch(resetRestoringSession());
    },
    [dispatch, getData, restoringSession, uid]
  );

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, async (user) => {
      if (user) checkUserExistance(user);
      else dispatch(resetRestoringSession());
    });

    return () => {
      authUnsub();
    };
  }, [checkUserExistance, dispatch, getData, uid]);

  return {
    isLoggedIn: Boolean(email),
    email,
    token,
    uid,
    userName,
    signUserOut,
    isLoggingIn,
  };
};
