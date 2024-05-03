import { FC } from "react";

import CreatedRoomInfo from "~/containers/home-info/created-room-info";
import NoRoomInfo from "~/containers/home-info/no-room-info";

import * as S from "./styles";
import { useUser } from "~/hooks/useUser";

const HomeInfo: FC = () => {
  const { roomId } = useUser();

  return <div className={S.infoWrapperStyle}>{roomId ? <CreatedRoomInfo roomId={roomId} /> : <NoRoomInfo />}</div>;
};

export default HomeInfo;
