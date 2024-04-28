import { FC, useEffect } from "react";

import CreatedRoomInfo from "~/containers/home-info/created-room-info";
import NoRoomInfo from "~/containers/home-info/no-room-info";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { useAuth } from "~/hooks/useAuth";
import useWebsocket from "~/hooks/useWebsocket";


import { joinRoom, leaveRoom } from "~/redux/slices/userSlice";
import { DBCollections } from "~/constants";
import { User } from "~/types";
import * as S from "./styles";

const HomeInfo: FC = () => {
  const { uid } = useAuth();
  const { roomId } = useAppSelector((state) => state.user);
  const { data } = useWebsocket<User>(DBCollections.Users, uid as string);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.roomId) {
      dispatch(joinRoom({ roomId: data.roomId }));
    } else if (roomId) {
      dispatch(leaveRoom());
    }
  }, [data, dispatch, roomId]);

  return <div className={S.infoWrapperStyle}>{roomId ? <CreatedRoomInfo roomId={roomId} /> : <NoRoomInfo />}</div>;
};

export default HomeInfo;
