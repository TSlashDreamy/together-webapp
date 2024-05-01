import { FC, useMemo } from "react";

import Typography from "~/components/typography";

import { ServicesType } from "~/types";
import { services } from "./constants";
import * as S from "./styles";

interface IProps {
  service: ServicesType;
}

const CardService: FC<IProps> = ({ service }) => {
  const { name, Icon } = useMemo(() => services[service], [service]);

  return (
    <div className={S.wrapperStyle}>
      <Icon className={S.iconStyle} />
      <Typography.SPAN className={S.serviceStyle}>{name}</Typography.SPAN>
    </div>
  );
};

export default CardService;
