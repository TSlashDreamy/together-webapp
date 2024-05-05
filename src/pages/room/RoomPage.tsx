import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiMiniWrenchScrewdriver as DevIcon } from "react-icons/hi2";

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
import { useUser } from "~/hooks/useUser";
import { routes } from "~/router/constants";
import MessageCard from "~/components/message-card";

const RoomPage: FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isVisible, hideModal, showModal } = useModal();
  const { closeRoom, leaveRoom, isCreatingRoom, roomName, isIAmTheHost, isMeInTheRoom, users, chat, hostUser, player } =
    useRoom(roomId as string);
  useUser(); // to update userData via websocket

  useEffect(() => {
    if (!isMeInTheRoom) navigate(routes.app.home);
  }, [isMeInTheRoom, navigate]);

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
    <PageWrapper className={S.pageWrapper}>
      <Modal isVisible={isVisible} hideModal={hideModal} title={"Add people"}>
        <MessageCard
          className="relative top-0 left-0 translate-x-0 translate-y-0"
          Icon={DevIcon}
          title="Work in progress (Add to room)"
          description="Sorry about that"
        />
        {/* //! TEMP */}
      </Modal>
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
                    onClick: handleDangerAction,
                    danger: true,
                    isLoading: isCreatingRoom,
                  }
                : undefined
            }
          >
            {isIAmTheHost && <IconButton Icon={LinkIcon} onClick={copyToClipboard} />}
            {isIAmTheHost && <IconButton Icon={AddPersonIcon} onClick={showModal} />}
          </SectionHeading>
          <MusicPlayer />
        </div>
        <RoomSidebar
          queue={player.queue}
          users={users}
          chat={chat}
          hostUser={hostUser as string}
          isAutoPlay={player.isAutoplay}
        />
      </div>
    </PageWrapper>
  );
};

export default RoomPage;
