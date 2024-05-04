import { FC, useMemo } from "react";
import { IoPersonCircle as TempAvatar } from "react-icons/io5";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import Typography from "~/components/typography";

import { useAppSelector } from "~/hooks/useRedux";

import { IMessage } from "~/types";
import * as S from "./styles";

interface IProps {
  message: IMessage;
}

const Message: FC<IProps> = ({ message }) => {
  const { uid } = useAppSelector((state) => state.user);

  const isMyMessage = useMemo(() => uid === message.user.id, [message.user.id, uid]);

  const msgClasses = twMerge(
    classNames(S.messageWrapper, {
      [S.myMessage]: isMyMessage,
    })
  );

  return (
    <div className={S.wrapper}>
      {!isMyMessage && (
        <div className={S.userWrapper}>
          <TempAvatar className={S.avatar} /> {/* // !TEMP */}
          <Typography.SPAN className="font-normal">{message.user.name}</Typography.SPAN>
        </div>
      )}
      <div className={msgClasses}>
        <Typography.SPAN className={S.message}>{message.content}</Typography.SPAN>
      </div>
    </div>
  );
};

export default Message;
