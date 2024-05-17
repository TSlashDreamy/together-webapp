import { FC } from "react";

import CreatedRoomInfo from "~/containers/home-info/created-room-info";
import NoRoomInfo from "~/containers/home-info/no-room-info";

import { useUser } from "~/hooks/useUser";

import * as S from "./styles";

const HomeInfo: FC = () => {
  const { roomId } = useUser();

  return <div className={S.infoWrapperStyle}>{roomId ? <CreatedRoomInfo /> : <NoRoomInfo />}</div>;
};

export default HomeInfo;
