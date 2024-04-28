import { FC } from "react";

import Typography from "~/components/typography";
import Button from "~/components/button";
import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";

import useRoom from "~/hooks/useRoom";

import * as S from "../styles";

const NoRoomInfo: FC = () => {
  const { createRoom, isCreatingRoom } = useRoom();

  return (
    <>
      <Typography.H2 className={S.headerStyle}>Create a room</Typography.H2>
      <div className={S.contentWrapper}>
        <div className={S.descriptionWrapper}>
          <RoomIcon />
          <Typography.H4>Don't have a room yet?</Typography.H4>
        </div>
        <Button primary outline isLoading={isCreatingRoom} onClick={createRoom}>
          Let's create one!
        </Button>
      </div>
    </>
  );
};

export default NoRoomInfo;
