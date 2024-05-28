import { FC, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";
import { IoPersonCircle as TempAvatar } from "react-icons/io5";
import { IoCheckmark as AcceptIcon } from "react-icons/io5";
import { RxCross2 as DenyIcon } from "react-icons/rx";
import { MdOutlineChair as RoomIcon } from "react-icons/md";
import { MdOutlinePersonRemove as RemoveFriendIcon } from "react-icons/md";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";

import useRoom from "~/hooks/useRoom";
import { useUser } from "~/hooks/useUser";

import { FriendStatus, IPerson } from "~/types";
import { statusColors } from "./constants";
import * as S from "./styles";

interface IProps {
  status: FriendStatus;
  user: IPerson;
  removeFriend: (friend: IPerson) => void;
}

const FriendItem: FC<IProps> = ({ status, user, removeFriend }) => {
  const [roomName, setRoomName] = useState("");
  const { getRoomName, inviteToRoom, roomName: myRoomName } = useRoom();
  const { getRoomId, acceptFriend, denyFriend, isProcessing, roomId: myRoomId } = useUser();

  const isPending = useMemo(() => status === FriendStatus.Pending, [status]);
  const isOffline = useMemo(() => status === FriendStatus.Offline, [status]);

  const classes = twMerge(S.wrapperStyles);
  const indicatorClasses = twMerge(S.mainIndicator, statusColors[!isOffline && !isPending && roomName ? FriendStatus.InARoom : status]);
  const statusClasses = twMerge(S.statusIndicator, statusColors[!isOffline && roomName ? FriendStatus.InARoom : status]);

  const handleInviteToRoom = async () => {
    if (!myRoomId || !myRoomName) return;
    await inviteToRoom(user, { name: myRoomName, id: myRoomId });
  };

  useEffect(() => {
    getRoomId(user.id).then((roomId) => getRoomName(roomId || null).then((roomName) => setRoomName(roomName || "")));
  }, [getRoomId, getRoomName, user.id]);

  return (
    <div className={classes}>
      <div className={indicatorClasses} />
      <div className={S.contentWrapper}>
        <div className={S.infoWrapper}>
          <Typography.H4 className={S.infoText}>Now</Typography.H4>
          <div className={S.statusWrapper}>
            <div className={statusClasses} />
            <Typography.SPAN>{!isOffline && roomName ? FriendStatus.InARoom : status}</Typography.SPAN>
          </div>
        </div>
        <div className={S.infoWrapper}>
          <Typography.H4 className={S.infoText}>Room</Typography.H4>
          <Typography.SPAN>{roomName || "User is not in a room"}</Typography.SPAN>
        </div>
        <div className={S.avatarWrapper}>
          <div className={S.userWrapper}>
            <TempAvatar className={S.avatar} />
            <Typography.SPAN className={S.infoText}>{user.name}</Typography.SPAN>
          </div>
          <IconButton Icon={ArrowIcon} disabled />
        </div>
        <div className={S.actionsWrapper}>
          {!isOffline && (
            <IconButton
              isLoading={isProcessing}
              disabled={(!isPending && !myRoomId) || (!isPending && Boolean(roomName))}
              Icon={isPending ? AcceptIcon : RoomIcon}
              onClick={isPending ? () => acceptFriend(user) : handleInviteToRoom}
            />
          )}
          <IconButton
            isLoading={isProcessing}
            Icon={isPending ? DenyIcon : RemoveFriendIcon}
            danger
            onClick={isPending ? () => denyFriend(user) : () => removeFriend(user)}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
