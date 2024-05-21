import { FC, HTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { RxCross1 as CloseIcon } from "react-icons/rx";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";
import Button from "~/components/button";

import { ModalType } from "~/constants";
import * as S from "./styles";

interface IModalProps {
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  isInProgress?: boolean;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  modalType: ModalType;
  modalProps: IModalProps;
}

const Modal: FC<IProps> = ({ children, isOpen, modalProps, modalType }) => {
  return createPortal(
    <div style={{ opacity: isOpen ? "1" : "0", pointerEvents: isOpen ? "auto" : "none" }} className={S.backdrop}>
      <div style={{ scale: isOpen ? "1" : "0.8" }} className={S.modal}>
        {modalType === ModalType.CONFIRM && (
          <div className={S.confirmWrapper}>
            <div className={S.titleWrapper}>
              <Typography.H3>{modalProps.title || "Are you sure?"}</Typography.H3>
              <IconButton small Icon={CloseIcon} onClick={modalProps.onCancel} />
            </div>
            <Typography.H5>{modalProps.message || "Do you really want to perform this action?"}</Typography.H5>
            <div className={S.buttonsWrapper}>
              <Button secondary outline isLoading={modalProps.isInProgress} onClick={modalProps.onCancel}>
                Cancel
              </Button>
              <Button danger outline isLoading={modalProps.isInProgress} onClick={modalProps.onConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        )}
        {modalType === ModalType.CONTENT && (
          <>
            <div className={S.titleWrapper}>
              <Typography.H3>{modalProps.title}</Typography.H3>
              <IconButton small Icon={CloseIcon} onClick={modalProps.onCancel} />
            </div>
            {children}
          </>
        )}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
