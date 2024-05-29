import { FC } from "react";
import { IoIosAdd as InviteIcon } from "react-icons/io";
import { IoPersonCircle as TempAvatar } from "react-icons/io5";

import Modal from "~/components/modal";
import IconButton from "~/components/icon-button";
import Typography from "~/components/typography";

import { useUser } from "~/hooks/useUser";
import useRoom from "~/hooks/useRoom";

import { ModalType } from "~/constants";
import { IPerson } from "~/types";
import * as S from "./styles";

interface IProps {
  isOpen: boolean;
  onCancel: () => void;
}

const InviteToRoomModal: FC<IProps> = ({ isOpen, onCancel }) => {
  const { friends } = useUser();
  const { inviteToRoom, roomId, roomName, users } = useRoom();

  const handleInviteToRoom = (friend: IPerson) => {
    if (!roomId || !roomName) return;
    inviteToRoom(friend, { id: roomId, name: roomName });
  };

  return (
    <Modal isOpen={isOpen} modalType={ModalType.CONTENT} modalProps={{ title: "Invite your friends to the room", onCancel }}>
      <div className={S.friendsWrapper}>
        {friends ? (
          friends.map((friend: IPerson) => (
            <div key={friend.id} className={S.item}>
              <div className={S.user}>
                <TempAvatar className={S.avatar} /> {/* // !TEMP */}
                <Typography.SPAN>{friend.name}</Typography.SPAN>
              </div>
              <IconButton
                small
                Icon={InviteIcon}
                disabled={users.some((user) => user.id === friend.id)}
                onClick={() => handleInviteToRoom(friend)}
              />
            </div>
          ))
        ) : (
          <Typography.SPAN>You have nobody to invite :c</Typography.SPAN>
        )}
      </div>
    </Modal>
  );
};

export default InviteToRoomModal;
