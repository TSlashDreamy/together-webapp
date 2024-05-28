import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { useAuth } from "~/hooks/useAuth";
import useWebsocket from "~/hooks/useWebsocket";
import { useUser } from "~/hooks/useUser";
import { useAppDispatch } from "~/hooks/useRedux";

import { setEmail, setFriends, setFriendsRequest, setLastLogin, setOutFriendsRequest, setRoomId, setRoomInvites, setUserName } from "~/redux/slices/userSlice";
import { resetRestoringSession } from "~/redux/slices/authSlice";

import { auth } from "~/firebase";
import { getKey } from "~/utils";
import { IPerson, IRoomInvite, IUser } from "~/types";
import { DBCollections } from "~/constants";

export const useUserUpdates = () => {
  const { uid } = useUser();
  const { checkUserExistance } = useAuth();
  const [alreadySettingUser, setAlreadySettingUser] = useState(false);
  const dispatch = useAppDispatch();

  /* //? Questionable way: IDK if this is a propper way to update each redux key independently (maybe there is a better way) */
  useWebsocket<string | null>(DBCollections.Users, uid, setRoomId, getKey<IUser, "roomId">("roomId"), undefined, null);
  useWebsocket<string | null>(DBCollections.Users, uid, setEmail, getKey<IUser, "email">("email"), undefined, null);
  useWebsocket<string | null>(DBCollections.Users, uid, setUserName, getKey<IUser, "userName">("userName"), undefined, null);
  useWebsocket<number | null>(DBCollections.Users, uid, setLastLogin, getKey<IUser, "lastLogin">("lastLogin"), undefined, null);
  useWebsocket<IPerson[] | null>(DBCollections.Users, uid, setOutFriendsRequest, getKey<IUser, "outFriendsRequest">("outFriendsRequest"), undefined, null);
  useWebsocket<IPerson[] | null>(DBCollections.Users, uid, setFriendsRequest, getKey<IUser, "friendsRequest">("friendsRequest"), undefined, null);
  useWebsocket<IPerson[] | null>(DBCollections.Users, uid, setFriends, getKey<IUser, "friends">("friends"), undefined, null);
  useWebsocket<IRoomInvite[] | null>(DBCollections.Users, uid, setRoomInvites, getKey<IUser, "roomInvites">("roomInvites"), undefined, null);
  /* //? ~Questionable way~ */

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
