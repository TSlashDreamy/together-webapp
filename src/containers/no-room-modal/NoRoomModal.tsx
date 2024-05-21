import { FC } from "react";

import JoinRoomModal from "~/containers/join-room-modal";
import Button from "~/components/button";
import Modal from "~/components/modal";
import Typography from "~/components/typography";

import useRoom from "~/hooks/useRoom";
import { useModal } from "~/hooks/useModal";

import { ModalType } from "~/constants";
import * as S from "./styles";

interface IProps {
  isOpen: boolean;
  onCancel: () => void;
}

const NoRoomModal: FC<IProps> = ({ isOpen, onCancel }) => {
  const doNavigate = false;
  const { createRoom, joinRoom, isCreatingRoom } = useRoom();
  const { isOpen: isJoinOpen, hideModal: hideJoinModal, showModal: showJoinModal } = useModal();

  const handleCreateRoom = async () => {
    await createRoom(doNavigate);
    onCancel();
  };

  const handleJoinRoom = () => {
    onCancel();
    showJoinModal();
  };

  return (
    <>
      <JoinRoomModal isOpen={isJoinOpen} isLoading={false} modalProps={{ onCancel: hideJoinModal }} handleJoin={joinRoom} />
      <Modal isOpen={isOpen} modalType={ModalType.CONTENT} modalProps={{ title: "Where do we hang out?", onCancel }}>
        <Typography.H5>It looks like you don't have a room yet. Would you like to create or join an existing one?</Typography.H5>
        <div className={S.buttonWrapper}>
          <Button primary outline onClick={handleCreateRoom} isLoading={isCreatingRoom}>
            Create room
          </Button>
          <Button primary outline onClick={handleJoinRoom} isLoading={isCreatingRoom}>
            Join room
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default NoRoomModal;
