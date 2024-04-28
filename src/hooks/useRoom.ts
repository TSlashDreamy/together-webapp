import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import useWebsocket from "~/hooks/useWebsocket";
import { useAuth } from "~/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";

import { getKey } from "~/utils";
import { resetIsLoading, setIsLoading } from "~/redux/slices/roomSlice";
import { showNotification } from "~/redux/slices/notificationSlice";
import { routes } from "~/router/constants";
import { initialRoomState } from "~/containers/home-info/no-room-info/constants";
import { DBCollections } from "~/constants";
import { NotificationType, Room, User } from "~/types";

const useRoom = (roomId?: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uid, userName } = useAuth();
  const { pushData, updateData } = useDatabase();
  const { isLoading } = useAppSelector((state) => state.room);
  const { data } = useWebsocket<Room>(DBCollections.Rooms, roomId as string);
  const roomRoot = routes.app.room;

  const createRoom = async () => {
    try {
      dispatch(setIsLoading());
      const room: Room = {
        ...initialRoomState,
        roomName: `${userName}'s room`,
        hostUser: uid as string,
        users: [uid as string],
      };

      await pushData(DBCollections.Rooms, room, room.roomId);
      await updateData(DBCollections.Users, room.roomId, uid as string, getKey<User, "roomId">("roomId"));
      navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${room.roomId}`);
    } catch (error) {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: error instanceof FirebaseError ? error.message : "We can't create a room for you :c",
        })
      );
    } finally {
      dispatch(resetIsLoading());
    }
  };

  return {
    createRoom,
    isCreatingRoom: isLoading,
    isIAmTheHost: uid === data?.hostUser,
    isRoomExist: Boolean(data?.roomId),
    roomRoute: `${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`,
    ...data,
  };
};

export default useRoom;
