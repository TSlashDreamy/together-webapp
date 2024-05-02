import { FC } from "react";
import { useParams } from "react-router-dom";

import RoomSidebar from "~/containers/room-sidebar";
import MusicPlayer from "~/containers/music-player";
import IconButton from "~/components/icon-button";
import PageWrapper from "~/components/page-wrapper";
import SectionHeading from "~/components/section-heading";
import Modal from "~/components/modal";

import { useAppDispatch } from "~/hooks/useRedux";
import useRoom from "~/hooks/useRoom";
import { useModal } from "~/hooks/useModal";

import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";
import LinkIcon from "~/assets/icons/etc-icons/link.svg?react";
import AddPersonIcon from "~/assets/icons/etc-icons/addPerson.svg?react";
import * as S from "./styles";
import { showNotification } from "~/redux/slices/notificationSlice";
import { NotificationType } from "~/types";

const RoomPage: FC = () => {
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const { isVisible, hideModal, showModal } = useModal();
  const { closeRoom, leaveRoom, isCreatingRoom, roomName, isIAmTheHost } = useRoom(roomId as string);

  const handleDangerAction = () => {
    if (isIAmTheHost) closeRoom();
    else leaveRoom();
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
    <PageWrapper>
      <Modal isVisible={isVisible} hideModal={hideModal} title={"Add people"} />
      <div className="flex h-viewport-minus-padding">
        <div className={S.contentSideStyle}>
          <SectionHeading
            Icon={RoomIcon}
            headingClassNames="font-normal"
            title={roomName || "wha? ._ ."}
            button={{
              name: isIAmTheHost ? "Close room" : "Leave room",
              onClick: handleDangerAction,
              danger: true,
              isLoading: isCreatingRoom,
            }}
          >
            {isIAmTheHost && <IconButton Icon={LinkIcon} onClick={copyToClipboard} />}
            {isIAmTheHost && <IconButton Icon={AddPersonIcon} onClick={showModal} />}
          </SectionHeading>
          <MusicPlayer />
        </div>
        <RoomSidebar />
      </div>
    </PageWrapper>
  );
};

export default RoomPage;
