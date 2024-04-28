import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "./useRedux";
import { auth } from "~/firebase";
import { removeUser, setUser } from "~/redux/slices/userSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";
import useDatabase from "./useDatabase";
import { DBCollections } from "~/constants";

export const useAuth = () => {
  const { email, token, uid, userName } = useAppSelector((state) => state.user);
  const { isLoggingIn } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();
  const { getData } = useDatabase();

  const signUserOut = async () => {
    dispatch(setLoggingIn());
    await signOut(auth);
    dispatch(removeUser());
    dispatch(resetLoggingIn());
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getData(DBCollections.Users, user.uid);
        userData &&
          dispatch(
            setUser({
              email: user.email,
              uid: user.uid,
              token: user.refreshToken,
              userName: userData.userName,
              lastLogin: userData.lastLogin,
              roomId: null
            })
          );
      }
    });
  }, [dispatch, getData]);

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
