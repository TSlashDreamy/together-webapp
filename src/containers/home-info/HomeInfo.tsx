import { FC } from "react";

import CreatedRoomInfo from "~/containers/home-info/created-room-info";
import NoRoomInfo from "~/containers/home-info/no-room-info";

import { useAppSelector } from "~/hooks/useRedux";
import * as S from "./styles";

const HomeInfo: FC = () => {
  const { roomId } = useAppSelector((state) => state.room);

  return <div className={S.infoWrapperStyle}>{roomId ? <CreatedRoomInfo /> : <NoRoomInfo />}</div>;
};

export default HomeInfo;
