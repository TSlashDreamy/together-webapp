import { FC } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { NotificationCounterType } from "~/constants";
import * as S from "./styles";

interface IProps {
  amount: number;
  type: NotificationCounterType;
}

const IndicatorCounter: FC<IProps> = ({ amount, type }) => {
  const notificationClasses = twMerge(
    classNames(S.notification, {
      [S.notificationAction]: type === NotificationCounterType.ACTION,
      [S.notificationAttention]: type === NotificationCounterType.ATTENTION,
      [S.notificationNeutral]: type === NotificationCounterType.NEUTRAL,
    })
  );

  return <div className={notificationClasses}>{amount}</div>;
};

export default IndicatorCounter;
