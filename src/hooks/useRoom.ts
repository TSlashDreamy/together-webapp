import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import useWebsocket from "~/hooks/useWebsocket";
import { useAuth } from "~/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";

import { getKey, getRandomNum } from "~/utils";
import { resetIsLoading, resetRoom, setIsLoading, setRoom } from "~/redux/slices/roomSlice";
import { showNotification } from "~/redux/slices/notificationSlice";
import { routes } from "~/router/constants";
import { initialRoomState } from "~/containers/home-info/no-room-info/constants";
import { DBCollections } from "~/constants";
import { NotificationType, Room, User } from "~/types";

const useRoom = (roomId?: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uid, userName } = useAuth();
  const { pushData, updateData, removeData, getData } = useDatabase();
  const room = useAppSelector((state) => state.room);
  const { data } = useWebsocket<Room>(DBCollections.Rooms, roomId as string, setRoom);
  const roomRoot = routes.app.room;

  const _handleRoomError = useCallback(
    (e: unknown) => {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Room)",
        })
      );
    },
    [dispatch]
  );

  const createRoom = async () => {
    try {
      dispatch(setIsLoading());
      const room: Room = {
        ...initialRoomState,
        roomId: String(Date.now()).concat(getRandomNum(10, 100000).toString()),
        roomName: `${userName}'s room`,
        hostUser: uid as string,
        users: [uid as string],
      };

      await pushData(DBCollections.Rooms, room, room.roomId);
      await updateData(DBCollections.Users, room.roomId, uid as string, getKey<User, "roomId">("roomId"));
      navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${room.roomId}`);
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const closeRoom = async () => {
    try {
      dispatch(setIsLoading());

      (data as Room)?.users.forEach(async (user) => {
        await updateData(DBCollections.Users, null, user, getKey<User, "roomId">("roomId"));
      });
      await removeData(DBCollections.Rooms, roomId as string);
      dispatch(resetRoom());
      navigate(routes.app.home);
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const leaveRoom = async () => {
    try {
      dispatch(setIsLoading());

      (data as Room)?.users.forEach(async (user, index) => {
        if (user === uid) {
          await removeData(DBCollections.Rooms, roomId as string, getKey<Room, "users">("users").concat(`/${index}`));
        }
      });
      await updateData(DBCollections.Users, null, uid as string, getKey<User, "roomId">("roomId"));
      dispatch(resetRoom());
      navigate(routes.app.home);
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const joinRoom = async (roomId: string) => {
    try {
      dispatch(setIsLoading());

      const room = await getData(DBCollections.Rooms, roomId);
      if (!room) throw new FirebaseError("", "This room doesn't exist");

      await updateData(DBCollections.Users, roomId, uid as string, getKey<User, "roomId">("roomId"));
      await updateData(
        DBCollections.Rooms,
        uid as string,
        roomId,
        getKey<Room, "users">("users").concat(`/${room.users.length}`)
      );
      navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`);
    } catch (error) {
      _handleRoomError(error);
    } finally {
      dispatch(resetIsLoading());
    }
  };

  return {
    createRoom,
    closeRoom,
    leaveRoom,
    joinRoom,
    isCreatingRoom: room.isLoading,
    isIAmTheHost: uid === (data as Room)?.hostUser,
    isRoomExist: Boolean(data?.roomId),
    isMeInTheRoom: room.users.includes(uid as string),
    roomRoute: `${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`,
    ...room,
  };
};

export default useRoom;
