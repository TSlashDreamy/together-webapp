import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useAuth } from "~/hooks/useAuth";
import useWebsocket from "~/hooks/useWebsocket";
import { useUser } from "~/hooks/useUser";
import { useAppDispatch } from "~/hooks/useRedux";

import { updateUser } from "~/redux/slices/userSlice";
import { resetRestoringSession } from "~/redux/slices/authSlice";

import { auth } from "~/firebase";
import { DBCollections } from "~/constants";
import { IUser } from "~/types";

export const useUserUpdates = () => {
  const { uid } = useUser();
  const { checkUserExistance } = useAuth();
  const [alreadySettingUser, setAlreadySettingUser] = useState(false);
  const dispatch = useAppDispatch();
  useWebsocket<IUser>(DBCollections.Users, uid as string, updateUser);

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, async (user) => {
      if (alreadySettingUser) return;
      setAlreadySettingUser(true);
      if (user) await checkUserExistance(user);
      else dispatch(resetRestoringSession());
      setAlreadySettingUser(false);
    });

    return () => {
      authUnsub();
    };
  }, [alreadySettingUser, checkUserExistance, dispatch]);
};
