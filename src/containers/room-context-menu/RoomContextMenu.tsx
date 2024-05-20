import { FC, Ref } from "react";
import { useNavigate } from "react-router-dom";

import RoomContextModal from "~/containers/room-context-modal";
import ContextMenu from "~/components/context-menu";

import { useAppSelector } from "~/hooks/useRedux";
import useRoom from "~/hooks/useRoom";
import { useModal } from "~/hooks/useModal";

import { IContextMenuConfig } from "~/components/context-menu/types";
import Modal from "~/components/modal";
import { ModalType } from "~/constants";

interface IProps {
  contextMenuRef: Ref<HTMLElement>;
  contextMenuConfig: IContextMenuConfig;
}

const RoomContextMenu: FC<IProps> = ({ contextMenuRef, contextMenuConfig }) => {
  const { roomId } = useAppSelector((state) => state.user);
  const { isOpen, hideModal, showModal } = useModal();
  const { isOpen: isConfirmOpen, hideModal: hideConfirm, showModal: showConfirm } = useModal();
  const { createRoom, closeRoom, leaveRoom, joinRoom, isIAmTheHost, isCreatingRoom, roomRoute, roomName } = useRoom();
  const navigate = useNavigate();

  const navigateToRoom = () => {
    navigate(roomRoute);
  };

  const handleDangerAction = () => {
    if (isIAmTheHost) closeRoom();
    else leaveRoom();
    hideConfirm();
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
          onClick: showConfirm,
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
      <RoomContextModal isOpen={isOpen} isLoading={isCreatingRoom} modalProps={{ onCancel: hideModal }} handleJoin={joinRoom} />
      <Modal
        isOpen={isConfirmOpen}
        modalType={ModalType.CONFIRM}
        modalProps={{
          message: isIAmTheHost
            ? "This action will completely delete the current room!"
            : "This room will not be available for you after you leave it!",
          onCancel: hideConfirm,
          onConfirm: handleDangerAction,
        }}
      />
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
