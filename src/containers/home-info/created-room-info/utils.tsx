import { FC } from "react";
import { IconType } from "react-icons";

import InfoCard from "~/components/info-card/InfoCard";

interface ICard {
  Icon?: FC | IconType;
  name: string;
  description: string;
  actionBtn?: { action: () => void; name: string; disabled?: boolean };
}

export const generateInfoCards = (cards: ICard[]) => {
  return cards.map((card) => <InfoCard key={card.name} card={card} actionBtn={card.actionBtn} />);
};
