import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import Typography from "~/components/typography";
import Button from "~/components/button";
import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";
import { useAuth } from "~/hooks/useAuth";

import { getKey } from "~/utils";
import { resetIsLoading, setIsLoading } from "~/redux/slices/roomSlice";
import { showNotification } from "~/redux/slices/notificationSlice";
import { routes } from "~/router/constants";
import { DBCollections } from "~/constants";
import { initialRoomState } from "./constants";
import { NotificationType, Room, User } from "~/types";
import * as S from "../styles";

const NoRoomInfo: FC = () => {
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();
  const { pushData, updateData } = useDatabase();
  const { uid } = useAuth();

  const handleCreateRoom = async () => {
    try {
      dispatch(setIsLoading());
      const roomRoot = routes.app.room;
      const room: Room = {
        ...initialRoomState,
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

  return (
    <>
      <Typography.H2 className={S.headerStyle}>Create a room</Typography.H2>
      <div className={S.contentWrapper}>
        <div className={S.descriptionWrapper}>
          <RoomIcon />
          <Typography.H4>Don't have a room yet?</Typography.H4>
        </div>
        <Button primary outline isLoading={isLoading} onClick={handleCreateRoom}>
          Let's create one!
        </Button>
      </div>
    </>
  );
};

export default NoRoomInfo;
