import { FC, Ref } from "react";

import ContextMenu from "~/components/context-menu";

import { useAppSelector } from "~/hooks/useRedux";

import { IContextMenuConfig } from "~/components/context-menu/types";
import { useNavigate } from "react-router-dom";
import { routes } from "~/router/constants";

interface IProps {
  contextMenuRef: Ref<HTMLElement>;
  contextMenuConfig: IContextMenuConfig;
}

const RoomContextMenu: FC<IProps> = ({ contextMenuRef, contextMenuConfig }) => {
  const { roomId } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const navigateToRoom = () => {
    const roomRoot = routes.app.room;
    navigate(`${roomRoot.slice(0, roomRoot.indexOf("/:"))}/${roomId}`);
  };

  const contextMenuButtons = [
    {
      text: "Open room",
      onClick: roomId ? navigateToRoom : () => null,
    },
    { text: "Close room", onClick: () => null, disabled: true, danger: true },
  ];

  return (
    <ContextMenu
      contextMenuRef={contextMenuRef}
      isToggled={contextMenuConfig.toggled}
      posX={contextMenuConfig.position.x}
      posY={contextMenuConfig.position.y}
      title={roomId ? `Your room: ${roomId}` : `It's time to create a new room c:`}
      buttons={contextMenuButtons}
    />
  );
};

export default RoomContextMenu;
