import { onAuthStateChanged, signOut } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "./useRedux";
import { auth } from "~/firebase";
import { removeUser, setUser } from "~/redux/slices/userSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);
  const { isLoggingIn } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const signUserOut = async () => {
    dispatch(setLoggingIn());
    await signOut(auth);
    dispatch(removeUser());
    dispatch(resetLoggingIn());
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
    }
  });

  return {
    isLoggedIn: Boolean(email),
    email,
    token,
    id,
    signUserOut,
    isLoggingIn,
  };
};
