import { FC, useMemo } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { LuCrown as HostIcon } from "react-icons/lu";
import { IoPersonCircle as TempAvatar } from "react-icons/io5";
import { RxCross2 as RemoveIcon } from "react-icons/rx";

import IconButton from "~/components/icon-button";
import Typography from "~/components/typography";

import useRoom from "~/hooks/useRoom";
import { useAppSelector } from "~/hooks/useRedux";

import { IPerson } from "~/types";
import * as S from "./styles";

const PersonCard: FC<IPerson> = ({ id, name }) => {
  const { uid } = useAppSelector((state) => state.user);
  const { isIAmTheHost, hostUser, kickFromRoom } = useRoom();
  const isYou = useMemo(() => uid === id, [uid, id]);
  const isUserHost = useMemo(() => hostUser === id, [hostUser, id]);

  const classes = twMerge(
    classNames(S.wrapperStyles, {
      "border-primary": isYou,
    })
  );
  return (
    <div className={classes}>
      <div className={S.userWrapper}>
        <TempAvatar className={S.avatar} /> {/* // !TEMP */}
        <Typography.SPAN className={S.constUserName}>{isYou ? "You" : name}</Typography.SPAN>
      </div>
      {isUserHost && <HostIcon className={S.hostIcon} />}
      {isIAmTheHost && !isYou && (
        <IconButton small danger iconOnly Icon={RemoveIcon} onClick={() => kickFromRoom(id)} />
      )}
    </div>
  );
};

export default PersonCard;
