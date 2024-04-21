import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { auth } from "~/firebase";
import { setUser } from "~/redux/slices/userSlice";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
  };
};
