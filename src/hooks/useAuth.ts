import { useAppSelector } from "./useRedux";

export const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.user);

  return {
    isLoggedIn: Boolean(email),
    email,
    token,
    id,
  };
};
