import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "./useRedux";
import { auth } from "~/firebase";
import { removeUser, setUser } from "~/redux/slices/userSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";
import useDatabase from "./useDatabase";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);
  const { isLoggingIn } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();
  const { getUserData } = useDatabase();

  const signUserOut = async () => {
    dispatch(setLoggingIn());
    await signOut(auth);
    dispatch(removeUser());
    dispatch(resetLoggingIn());
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user);
        userData &&
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.refreshToken,
              userName: userData.userName,
              lastLogin: userData.lastLogin,
            })
          );
      }
    });
  }, [dispatch, getUserData]);

  return {
    isLoggedIn: Boolean(email),
    email,
    token,
    id,
    signUserOut,
    isLoggingIn,
  };
};
