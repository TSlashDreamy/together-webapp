import { FC } from "react";
import { MdOutlineChair as RoomIcon } from "react-icons/md";

import Typography from "~/components/typography";
import Button from "~/components/button";

import useRoom from "~/hooks/useRoom";

import * as S from "../styles";

const NoRoomInfo: FC = () => {
  const { createRoom, isCreatingRoom } = useRoom();

  return (
    <>
      <Typography.H2 className={S.headerStyle}>Create a room</Typography.H2>
      <div className={S.contentWrapper}>
        <div className={S.descriptionWrapper}>
          <RoomIcon className={S.icon}/>
          <Typography.H4>Don't have a room yet?</Typography.H4>
        </div>
        <Button primary outline isLoading={isCreatingRoom} onClick={() => createRoom()}>
          Let's create one!
        </Button>
      </div>
    </>
  );
};

export default NoRoomInfo;
