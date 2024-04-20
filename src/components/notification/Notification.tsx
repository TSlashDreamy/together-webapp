import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { MdError as ErrorIcon } from "react-icons/md";
import { CiCircleCheck as SuccessIcon } from "react-icons/ci";
import { RxCross1 as CloseIcon } from "react-icons/rx";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { hideNotification } from "~/redux/slices/notificationSlice";

import { NotificationType } from "~/types";
import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Notification: FC<IProps> = ({ ...other }) => {
  const dispatch = useAppDispatch();
  const [icon, setIcon] = useState<ReactNode>(null);
  const { content, type } = useAppSelector((state) => state.notification);

  const classes = twMerge(
    classNames(other.className, S.notificationStyle, {
      [S.errorStyle]: type === NotificationType.Error,
      [S.successStyles]: type === NotificationType.Success,
    })
  );

  useEffect(() => {
    switch (type) {
      case NotificationType.Error:
        setIcon(<ErrorIcon />);
        break;
      case NotificationType.Success:
        setIcon(<SuccessIcon />);
        break;
    }
  }, [type]);

  return (
    Boolean(content) && (
      <div className={classes}>
        {icon}
        {content}
        <CloseIcon className="cursor-pointer" onClick={() => dispatch(hideNotification())} />
      </div>
    )
  );
};

export default Notification;
