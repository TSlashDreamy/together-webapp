import { FC, Ref, useState } from "react";
import { useNavigate } from "react-router-dom";

import ContextMenu from "~/components/context-menu";
import Modal from "~/components/modal";
import Input from "~/components/input";

import { useAppSelector } from "~/hooks/useRedux";
import useRoom from "~/hooks/useRoom";
import { useModal } from "~/hooks/useModal";

import { IContextMenuConfig } from "~/components/context-menu/types";
import Button from "~/components/button";

interface IProps {
  contextMenuRef: Ref<HTMLElement>;
  contextMenuConfig: IContextMenuConfig;
}

const RoomContextMenu: FC<IProps> = ({ contextMenuRef, contextMenuConfig }) => {
  const { roomId } = useAppSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const { createRoom, closeRoom, leaveRoom, joinRoom, isIAmTheHost, isCreatingRoom, roomRoute, roomName } = useRoom(
    roomId as string
  );
  const { isVisible, hideModal, showModal } = useModal();
  const navigate = useNavigate();

  const navigateToRoom = () => {
    navigate(roomRoute);
  };

  const handleJoinRoom = () => {
    joinRoom(inputValue);
  };

  const contextMenuButtons = [
    {
      text: roomId ? "Open room" : "Create room",
      onClick: roomId ? navigateToRoom : createRoom,
      isLoading: isCreatingRoom,
    },
    roomId
      ? {
          text: isIAmTheHost ? "Close room" : "Leave room",
          onClick: isIAmTheHost ? closeRoom : leaveRoom,
          isLoading: isCreatingRoom,
          danger: true,
        }
      : {
          text: "Join room",
          onClick: showModal,
        },
  ];

  return (
    <>
      <Modal isVisible={isVisible} title={"Join room"} hideModal={hideModal}>
        <div className="flex flex-col gap-5 items-center m-auto mt-[20%]">
          <Input
            name={"roomId"}
            placeholder={"Room id"}
            value={inputValue}
            type={"text"}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button primary outline isLoading={isCreatingRoom} onClick={handleJoinRoom}>
            Join
          </Button>
        </div>
      </Modal>
      <ContextMenu
        contextMenuRef={contextMenuRef}
        isToggled={contextMenuConfig.toggled}
        posX={contextMenuConfig.position.x}
        posY={contextMenuConfig.position.y}
        title={roomId ? `${isIAmTheHost ? "Your room" : "You joined"}: ${roomName}` : `It's lonely here`}
        buttons={contextMenuButtons}
      />
    </>
  );
};

export default RoomContextMenu;
