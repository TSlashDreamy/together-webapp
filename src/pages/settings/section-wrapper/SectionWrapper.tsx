import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import CardWrapper from "~/components/card-wrapper";
import Typography from "~/components/typography";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  message?: string;
  danger?: boolean;
  unactive?: boolean;
}

const SectionWrapper: FC<IProps> = ({ name, message, children, danger, unactive, ...other }) => {
  const classes = twMerge(
    classNames(S.card, other.className, {
      "opacity-50 pointer-events-none": unactive,
    })
  );

  return (
    <CardWrapper className={classes}>
      <div className={S.titleWrapper}>
        <Typography.H3 className={danger ? "text-danger-600" : ""}>{name}</Typography.H3>
        {message && <Typography.SPAN className="opacity-50">{message}</Typography.SPAN>}
        {unactive && <Typography.SPAN className="opacity-50">(Not available)</Typography.SPAN>}
      </div>
      <div className={S.optionsWrapper}>{children}</div>
    </CardWrapper>
  );
};

export default SectionWrapper;
