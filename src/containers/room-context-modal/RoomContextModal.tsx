import { FC, HTMLAttributes, useState } from "react";

import Button from "~/components/button";
import Input from "~/components/input";
import Modal from "~/components/modal";

import { ModalType } from "~/constants";
import { InputTypes } from "~/types";
import * as S from "./styles";

interface IModalProps {
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isLoading: boolean;
  modalProps: IModalProps;
  handleJoin: (roomId: string) => Promise<void>;
}

const RoomContextModal: FC<IProps> = ({ isOpen, isLoading, modalProps, handleJoin }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Modal isOpen={isOpen} modalType={ModalType.CONTENT} modalProps={{ title: "Join room", onCancel: modalProps.onCancel }}>
      <div className={S.modalContent}>
        <Input
          name={"roomId"}
          placeholder={"Room id"}
          value={inputValue}
          type={InputTypes.Text}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button primary outline isLoading={isLoading} onClick={() => handleJoin(inputValue)}>
          Join
        </Button>
      </div>
    </Modal>
  );
};

export default RoomContextModal;
