import { FC, Ref } from "react";

import ContextMenu from "~/components/context-menu";

import { useAppSelector } from "~/hooks/useRedux";

import { IContextMenuConfig } from "~/components/context-menu/types";
import { useNavigate } from "react-router-dom";
import useRoom from "~/hooks/useRoom";

interface IProps {
  contextMenuRef: Ref<HTMLElement>;
  contextMenuConfig: IContextMenuConfig;
}

const RoomContextMenu: FC<IProps> = ({ contextMenuRef, contextMenuConfig }) => {
  const { roomId } = useAppSelector((state) => state.user);
  const { isIAmTheHost, roomRoute, roomName } = useRoom(roomId as string);
  const navigate = useNavigate();

  const navigateToRoom = () => {
    navigate(roomRoute);
  };

  const contextMenuButtons = [
    {
      text: roomId ? "Open room" : "Create room",
      onClick: roomId ? navigateToRoom : () => null,
      disabled: Boolean(!roomId),
    },
    { text: "Close room", onClick: () => null, disabled: true, danger: true },
  ];

  return (
    <ContextMenu
      contextMenuRef={contextMenuRef}
      isToggled={contextMenuConfig.toggled}
      posX={contextMenuConfig.position.x}
      posY={contextMenuConfig.position.y}
      title={roomId ? `${isIAmTheHost ? "Your room" : "You joined"}: ${roomName}` : `Create your room`}
      buttons={contextMenuButtons}
    />
  );
};

export default RoomContextMenu;
