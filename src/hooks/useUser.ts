import { useCallback, useState } from "react";
import { FirebaseError } from "firebase/app";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";

import { showNotification } from "~/redux/slices/notificationSlice";

import { getKey } from "~/utils";
import { DBCollections } from "~/constants";
import { IPerson, IUser, NotificationType } from "~/types";

export const useUser = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { getData, updateData } = useDatabase();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const _handleUserError = useCallback(
    (e: unknown) => {
      console.error("(E) User: \n", e);
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (User operation)",
        })
      );
    },
    [dispatch]
  );

  const _checkIfAlreadyFriends = useCallback(
    (fid: string) => {
      if (fid === user.uid) return new FirebaseError("", "Are you trying to send the request to yourself? 🤨");

      const isFriends = (user && user.friends?.some((friend) => friend.id === fid)) || false;
      if (isFriends) return new FirebaseError("", "You are already friends!");

      const isRequested = (user && user.outFriendsRequest?.some((friend) => friend.id === fid)) || false;
      if (isRequested) return new FirebaseError("", "You already sended request to this user!");

      const isIncomeRequest = (user && user.friendsRequest?.some((friend) => friend.id === fid)) || false;
      if (isIncomeRequest) return new FirebaseError("", "This user already sended request to you! Accept it 🙌");
    },
    [user]
  );

  const _clearFriendsQueue = useCallback(
    async (friend: IPerson) => {
      const friendOutRequests = await getData<IPerson[]>(
        DBCollections.Users,
        friend.id,
        getKey<IUser, "outFriendsRequest">("outFriendsRequest")
      );

      await updateData(
        DBCollections.Users,
        user.friendsRequest?.filter((request) => request.id !== friend.id) || [],
        user.uid as string,
        getKey<IUser, "friendsRequest">("friendsRequest")
      );
      await updateData(
        DBCollections.Users,
        friendOutRequests?.filter((request) => request.id !== user.uid) || [],
        friend.id,
        getKey<IUser, "outFriendsRequest">("outFriendsRequest")
      );
    },
    [getData, updateData, user.friendsRequest, user.uid]
  );

  const getRoomId = useCallback(
    async (userId: string) => {
      try {
        const id = await getData<string>(DBCollections.Users, userId, getKey<IUser, "roomId">("roomId"));
        return id;
      } catch (error) {
        console.error("(E) Getting user roomId", error);
      }
    },
    [getData]
  );

  const doFriendRequest = useCallback(
    async (fid: string) => {
      try {
        setIsProcessing(true);

        const [identifier, friendId] = fid.split(":");
        if (identifier !== "fid") throw new FirebaseError("", "This invite id is invalid!");
        const friendName = await getData(DBCollections.Users, friendId, getKey<IUser, "userName">("userName"));
        if (!friendName) throw new FirebaseError("", "This user doesn't exist!");
        const friendFriendRequests = await getData<IPerson[]>(DBCollections.Users, friendId, getKey<IUser, "friendsRequest">("friendsRequest"));
        const fErr = _checkIfAlreadyFriends(friendId);
        if (fErr) throw fErr;

        await updateData(
          DBCollections.Users,
          [...(user.outFriendsRequest || []), { id: friendId, name: friendName }] as IPerson[],
          user.uid as string,
          getKey<IUser, "outFriendsRequest">("outFriendsRequest")
        );
        await updateData(
          DBCollections.Users,
          [...(friendFriendRequests || []), { id: user.uid, name: user.userName }] as IPerson[],
          friendId,
          getKey<IUser, "friendsRequest">("friendsRequest")
        );
        return true;
      } catch (error) {
        _handleUserError(error);
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [_checkIfAlreadyFriends, _handleUserError, getData, updateData, user.outFriendsRequest, user.uid, user.userName]
  );

  const acceptFriend = useCallback(
    async (friend: IPerson) => {
      try {
        setIsProcessing(true);
        const friendFriends = await getData<IPerson[]>(DBCollections.Users, friend.id, getKey<IUser, "friends">("friends"));

        await _clearFriendsQueue(friend);
        await updateData(
          DBCollections.Users,
          [...(user.friends || []), { ...friend }] as IPerson[],
          user.uid as string,
          getKey<IUser, "friends">("friends")
        );
        await updateData(
          DBCollections.Users,
          [...(friendFriends || []), { id: user.uid, name: user.userName }] as IPerson[],
          friend.id,
          getKey<IUser, "friends">("friends")
        );
      } catch (error) {
        _handleUserError(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [_clearFriendsQueue, _handleUserError, getData, updateData, user.friends, user.uid, user.userName]
  );

  const denyFriend = useCallback(
    async (friend: IPerson) => {
      try {
        setIsProcessing(true);

        await _clearFriendsQueue(friend);
      } catch (error) {
        _handleUserError(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [_clearFriendsQueue, _handleUserError]
  );

  const removeFriend = useCallback(
    async (friend: IPerson) => {
      try {
        setIsProcessing(true);
        const friendFriends = await getData<IPerson[]>(DBCollections.Users, friend.id, getKey<IUser, "friends">("friends"));

        const updatedFriendFriends = friendFriends?.filter((friend) => friend.id !== user.uid);
        await updateData(DBCollections.Users, updatedFriendFriends, friend.id, getKey<IUser, "friends">("friends"));

        const updatedMyFriends = user.friends?.filter((myFriend) => myFriend.id !== friend.id);
        await updateData(DBCollections.Users, updatedMyFriends, user.uid as string, getKey<IUser, "friends">("friends"));
      } catch (error) {
        _handleUserError(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [_handleUserError, getData, updateData, user.friends, user.uid]
  );

  return { ...user, isProcessing, getRoomId, doFriendRequest, acceptFriend, denyFriend, removeFriend };
};
