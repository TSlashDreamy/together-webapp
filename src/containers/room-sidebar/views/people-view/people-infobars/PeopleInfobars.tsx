import { FC } from "react";

import Typography from "~/components/typography";

import * as S from "./styles";
import { IPerson } from "~/types";

interface IProps {
  people: IPerson[];
}

const PeopleInfobars: FC<IProps> = ({ people }) => {
  return (
    <div className={S.actionBlockWrapper}>
      <Typography.SPAN className="font-normal">
        {people.length > 1 ? `${people.length} people in room` : "Only you are here"}
      </Typography.SPAN>
    </div>
  );
};

export default PeopleInfobars;
