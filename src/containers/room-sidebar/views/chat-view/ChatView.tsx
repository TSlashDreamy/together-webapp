import { FC, KeyboardEvent, useRef, useState } from "react";

import CardWrapper from "~/components/card-wrapper";
import Input from "~/components/input";
import Message from "~/components/message/Message";
import Typography from "~/components/typography";
import useRoom from "~/hooks/useRoom";

import { IChat, InputTypes } from "~/types";
import * as S from "./styles";

interface IProps {
  chat: IChat;
}

const ChatView: FC<IProps> = ({ chat }) => {
  const [userMsg, setUserMsg] = useState<string>("");
  const msgWrapperRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useRoom();

  const handleSendMsg = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendMessage(userMsg);
      setUserMsg("");
      msgWrapperRef.current?.scrollTo({ top: msgWrapperRef.current?.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div ref={msgWrapperRef} className={S.wrapper}>
      <div className={S.messagesWrapper}>
        {chat && chat.messages ? (
          chat.messages.map((message) => <Message key={`${message.content}${message.user.id}`} message={message} />)
        ) : (
          <CardWrapper>
            <Typography.SPAN>No messages in this room</Typography.SPAN>
          </CardWrapper>
        )}
      </div>
      <div className={S.inputWrapper}>
        <Input
          className={S.input}
          name={"messageBox"}
          placeholder={"Press 'Enter' to send"}
          value={userMsg}
          type={InputTypes.Text}
          onChange={(e) => setUserMsg(e.target.value)}
          onKeyDown={handleSendMsg}
        ></Input>
      </div>
    </div>
  );
};

export default ChatView;
