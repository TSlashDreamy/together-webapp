import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PiCloudWarning as ServiceError } from "react-icons/pi";

import Modal from "~/components/modal";
import Typography from "~/components/typography";
import Button from "~/components/button";

import { useAppDispatch } from "~/hooks/useRedux";

import { resetServiceHealth } from "~/redux/slices/appSlice";

import { ModalType } from "~/constants";
import { routes } from "~/router/constants";
import * as S from "./styles";

interface IModalProps {
  isOpen: boolean;
  message: string;
}

const ServiceHealthModal: FC<IModalProps> = ({ isOpen, message }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFixClick = () => {
    dispatch(resetServiceHealth());
    navigate(routes.app.settings);
  };

  const onClose = () => {
    dispatch(resetServiceHealth());
  };

  return (
    <Modal isOpen={isOpen} modalType={ModalType.CONTENT} modalProps={{ title: "Oh, wait!", onCancel: onClose }}>
      <div className="flex flex-col justify-center items-center gap-2">
        <ServiceError className={S.icon} />
        <Typography.H5>{message}</Typography.H5>
      </div>
      <div className={S.buttonWrapper}>
        <Button primary outline onClick={handleFixClick}>
          Go to settings
        </Button>
      </div>
    </Modal>
  );
};

export default ServiceHealthModal;
