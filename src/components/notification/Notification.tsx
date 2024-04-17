import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { MdError as ErrorIcon } from "react-icons/md";
import { CiCircleCheck as SuccessIcon } from "react-icons/ci";
import { RxCross1 as CloseIcon } from "react-icons/rx";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { hideNotification } from "~/redux/slices/notificationSlice";

import { NotificationType } from "./types";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Notification: FC<IProps> = ({ ...other }) => {
  const dispatch = useAppDispatch();
  const [icon, setIcon] = useState<ReactNode>(null);
  const { content, type } = useAppSelector((state) => state.notification);

  const classes = twMerge(
    classNames(
      other.className,
      "fixed bottom-4 right-4 flex items-center gap-2 max-w-2xl size-auto z-40 px-4 py-2 border-[1px] rounded-[10px] text-danger-300 bg-danger-transparent backdrop-blur-[150px] font-light transition-all animate-notificationExpand",
      {
        "border-danger-500": type === NotificationType.Error,
        "border-success-500": type === NotificationType.Success,
      }
    )
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
