import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { useAuth } from "~/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";

import { generateId, getKey } from "~/utils";
import { resetIsLoading, resetRoom, setIsLoading } from "~/redux/slices/roomSlice";
import { showNotification } from "~/redux/slices/notificationSlice";
import { routes } from "~/router/constants";
import { initialRoomState } from "~/containers/home-info/no-room-info/constants";
import { DBCollections, initalFirebasePlayerState } from "~/constants";
import { IChat, IMessage, NotificationType, IPerson, IRoom, IUser, IFirebasePlayer, IRoomInvite } from "~/types";

const useRoom = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uid, userName } = useAuth();
  const { pushData, updateData, removeData, getData } = useDatabase();
  const room = useAppSelector((state) => state.room);
  const { roomId } = useAppSelector((state) => state.user);
  const roomRoot = routes.app.room;

  const _handleRoomError = useCallback(
    (e: unknown) => {
      console.error("(E) Room: \n", e);
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Room)",
        })
      );
    },
    [dispatch]
  );

  const _outRoomAction = async (userId?: string) => {
    try {
      dispatch(setIsLoading());

      const updatedUsers = room?.users.filter((user) => user.id !== (userId || uid));
      await updateData(DBCollections.Rooms, updatedUsers, room.roomId as string, getKey<IRoom, "users">("users"));
      await updateData(DBCollections.Users, null, userId || (uid as string), getKey<IUser, "roomId">("roomId"));
      if (!userId) {
        dispatch(resetRoom());
        navigate(routes.app.home);
      }
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const createRoom = async (doNavigate: boolean = true) => {
    try {
      dispatch(setIsLoading());
      const room: IRoom = {
        ...initialRoomState,
        roomId: generateId(),
        roomName: `${userName}'s room`,
        hostUser: uid as string,
        users: [{ id: uid as string, name: userName as string }],
        playerId: generateId(),
      };

      const player: IFirebasePlayer = {
        ...initalFirebasePlayerState,
        id: room.playerId,
      };

      await pushData(DBCollections.Rooms, room, room.roomId);
      await pushData(DBCollections.Players, player, player.id as string);
      await updateData(DBCollections.Users, room.roomId, uid as string, getKey<IUser, "roomId">("roomId"));
      setTimeout(async () => await removeData(DBCollections.Users, uid as string, getKey<IUser, "roomInvites">("roomInvites")), 900);
      doNavigate && navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${room.roomId}`);
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
      dispatch(showNotification({ type: NotificationType.Success, content: "Your room was successfully created!" }));
    }
  };

  const closeRoom = async (doNavigate: boolean = true) => {
    try {
      dispatch(setIsLoading());

      await removeData(DBCollections.Players, room.playerId as string);
      await removeData(DBCollections.Rooms, roomId as string);
      room?.users.forEach(async (user) => {
        await updateData(DBCollections.Users, null, user.id, getKey<IUser, "roomId">("roomId"));
      });
      doNavigate && navigate(routes.app.home);
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const leaveRoom = async () => {
    await _outRoomAction();
  };

  const joinRoom = useCallback(
    async (roomId: string) => {
      try {
        dispatch(setIsLoading());

        const room = await getData<IRoom>(DBCollections.Rooms, roomId);
        if (!room) throw new FirebaseError("", "This room doesn't exist");

        await updateData(DBCollections.Users, roomId, uid as string, getKey<IUser, "roomId">("roomId"));
        await updateData(
          DBCollections.Rooms,
          { id: uid as string, name: userName as string } as IPerson,
          roomId,
          getKey<IRoom, "users">("users").concat(`/${room.users.length}`)
        );
        navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`);
        setTimeout(async () => await removeData(DBCollections.Users, uid as string, getKey<IUser, "roomInvites">("roomInvites")), 900);
      } catch (error) {
        _handleRoomError(error);
      } finally {
        dispatch(resetIsLoading());
      }
    },
    [_handleRoomError, dispatch, getData, navigate, removeData, roomRoot, uid, updateData, userName]
  );

  const kickFromRoom = async (userId: string) => {
    try {
      if (!userId) throw new FirebaseError("", "Illegal action (userId doesn't exist)");
      if (!room.roomId) throw new FirebaseError("", "Whew, looks like something wrong with this room. Try to reload it (Ctrl+R)");
      await _outRoomAction(userId);
    } catch (error) {
      _handleRoomError(error);
    }
  };

  const sendMessage = async (content: string) => {
    try {
      if (!content) throw new FirebaseError("", "Can't send empty message.");

      const message = { user: { id: uid, name: userName } as IPerson, content } as IMessage;
      const msgIndex = (room.chat && room.chat.messages && room.chat.messages.length) ?? 0;
      await updateData(
        DBCollections.Rooms,
        message,
        room.roomId as string,
        getKey<IRoom, "chat">("chat").concat(`/${getKey<IChat, "messages">("messages")}/${msgIndex}`)
      );
    } catch (error) {
      _handleRoomError(error);
    }
  };

  const getRoomName = async (roomId: string | null) => {
    try {
      if (roomId === null) return null;
      const name = await getData<string>(DBCollections.Rooms, roomId, getKey<IRoom, "roomName">("roomName"));
      return name;
    } catch (error) {
      _handleRoomError(error);
    }
  };

  const inviteToRoom = useCallback(
    async (friend: IPerson, roomInvite: IRoomInvite) => {
      try {
        dispatch(setIsLoading());
        const friendInvites = await getData<IRoomInvite[]>(DBCollections.Users, friend.id, getKey<IUser, "roomInvites">("roomInvites"));
        const isAlredyInvited = friendInvites?.find((invite) => invite.id === roomInvite.id);
        if (isAlredyInvited) throw new FirebaseError("", `You already invited ${friend.name} to your room.`);

        await updateData(DBCollections.Users, [...(friendInvites || []), roomInvite], friend.id, getKey<IUser, "roomInvites">("roomInvites"));
        dispatch(showNotification({ type: NotificationType.Success, content: `${friend.name} was invited to your room 🎉` }));
      } catch (error) {
        _handleRoomError(error);
      } finally {
        dispatch(resetIsLoading());
      }
    },
    [_handleRoomError, dispatch, getData, updateData]
  );

  const acceptRoomInvite = useCallback(
    async (inviteId: string) => {
      try {
        dispatch(setIsLoading());

        await joinRoom(inviteId);
      } catch (error) {
        _handleRoomError(error);
      } finally {
        dispatch(resetIsLoading());
      }
    },
    [_handleRoomError, dispatch, joinRoom]
  );

  return {
    createRoom,
    closeRoom,
    leaveRoom,
    joinRoom,
    kickFromRoom,
    sendMessage,
    getRoomName,
    inviteToRoom,
    acceptRoomInvite,
    isCreatingRoom: room.isLoading,
    isIAmTheHost: uid === room.hostUser,
    isRoomExist: Boolean(room.roomId),
    isMeInTheRoom: room.users.some((user) => user.id === uid),
    roomRoute: `${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`,
    ...room,
  };
};

export default useRoom;
