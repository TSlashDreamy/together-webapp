import { FC } from "react";
import { twMerge } from "tailwind-merge";

import Typography from "~/components/typography";

import { statusPresets } from "./constants";
import { ServiceStatus } from "~/services/constants";
import * as S from "./styles";

interface IProps {
  status: ServiceStatus;
}

const StatusChip: FC<IProps> = ({ status }) => {
  const { style, content } = statusPresets[status];
  const classes = twMerge(S.wrapper, style);

  return (
    <div className={classes}>
      <Typography.SPAN>{content}</Typography.SPAN>
    </div>
  );
};

export default StatusChip;
