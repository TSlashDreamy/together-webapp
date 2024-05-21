import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineChair as RoomIcon } from "react-icons/md";

import RoomSidebar from "~/containers/room-sidebar";
import MusicPlayer from "~/containers/music-player";
import IconButton from "~/components/icon-button";
import PageWrapper from "~/components/page-wrapper";
import SectionHeading from "~/components/section-heading";
import Modal from "~/components/modal";

import { useAppDispatch } from "~/hooks/useRedux";
import useRoom from "~/hooks/useRoom";
import { useModal } from "~/hooks/useModal";

import { showNotification } from "~/redux/slices/notificationSlice";

import LinkIcon from "~/assets/icons/etc-icons/link.svg?react";
import AddPersonIcon from "~/assets/icons/etc-icons/addPerson.svg?react";

import { NotificationType } from "~/types";
import { routes } from "~/router/constants";
import { ModalType } from "~/constants";
import * as S from "./styles";

const RoomPage: FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen, hideModal, showModal } = useModal();
  const { closeRoom, leaveRoom, isCreatingRoom, roomName, isIAmTheHost, isMeInTheRoom } = useRoom();

  useEffect(() => {
    if (!isMeInTheRoom) navigate(routes.app.home);
  }, [isMeInTheRoom, navigate]);

  const handleDangerAction = () => {
    if (isIAmTheHost) closeRoom();
    else leaveRoom();
    hideModal();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId as string);
    dispatch(
      showNotification({
        content: "Room id was copied to clipboard",
        type: NotificationType.Success,
      })
    );
  };

  return (
    <PageWrapper className={S.pageWrapper}>
      <Modal
        isOpen={isOpen}
        modalType={ModalType.CONFIRM}
        modalProps={{
          message: isIAmTheHost
            ? "This action will completely delete the current room!"
            : "This room will not be available for you after you leave it!",
          onCancel: hideModal,
          onConfirm: handleDangerAction,
        }}
      />
      <div className={S.contentWrapper}>
        <div className={S.contentSideStyle}>
          <SectionHeading
            Icon={RoomIcon}
            headingClassNames="font-normal"
            title={roomName || "Unknown room"}
            button={
              isMeInTheRoom
                ? {
                    name: isIAmTheHost ? "Close room" : "Leave room",
                    onClick: showModal,
                    danger: true,
                    isLoading: isCreatingRoom,
                  }
                : undefined
            }
          >
            {isIAmTheHost && <IconButton Icon={LinkIcon} onClick={copyToClipboard} />}
            {isIAmTheHost && <IconButton Icon={AddPersonIcon} onClick={() => null} />}
          </SectionHeading>
          <MusicPlayer />
        </div>
        <RoomSidebar />
      </div>
    </PageWrapper>
  );
};

export default RoomPage;
