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
  doAddFriend: (fid: string) => Promise<void>;
}

const AddFriendModal: FC<IProps> = ({ isOpen, isLoading, modalProps, doAddFriend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleCancel = () => {
    modalProps.onCancel && modalProps.onCancel();
    setTimeout(() => setInputValue(""), 500);
  };

  const handleAdd = async () => {
    await doAddFriend(inputValue);
    setTimeout(() => setInputValue(""), 500);
  };

  return (
    <Modal isOpen={isOpen} modalType={ModalType.CONTENT} modalProps={{ title: "Make a friend request", onCancel: handleCancel }}>
      <div className={S.modalContent}>
        <Input
          name={"fid"}
          placeholder={"Paste your friend's invite ID here (fid:)"}
          value={inputValue}
          type={InputTypes.Text}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button primary outline isLoading={isLoading} onClick={handleAdd}>
          Add friend
        </Button>
      </div>
    </Modal>
  );
};

export default AddFriendModal;
