import { User as FirebaseUser } from "firebase/auth";
import { IUser } from "~/types";

export const convertUserData = (user: FirebaseUser, userName: string) => {
  return {
    uid: user.uid,
    email: user.email,
    userName: userName,
    lastLogin: Date.now(),
  } as Omit<IUser, "token">;
};
