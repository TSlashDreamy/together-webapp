import { IUser } from "~/types";
import useWebsocket from "./useWebsocket";
import { DBCollections } from "~/constants";
import { useAppSelector } from "./useRedux";
import { updateUser } from "~/redux/slices/userSlice";

export const useUser = () => {
  const user = useAppSelector((state) => state.user);
  useWebsocket<IUser>(DBCollections.Users, user.uid as string, updateUser);

  return { ...user };
};
