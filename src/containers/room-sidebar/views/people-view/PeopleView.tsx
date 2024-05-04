import { FC } from "react";

import PersonCard from "~/components/person-card";

import { IPerson } from "~/types";
import * as S from "./styles";

interface IProps {
  people: IPerson[];
}

const PeopleView: FC<IProps> = ({ people }) => {
  return (
    <div className={S.wrapper}>
      {people.map((person) => (
        <PersonCard key={person.id} id={person.id} name={person.name} />
      ))}
    </div>
  );
};

export default PeopleView;
