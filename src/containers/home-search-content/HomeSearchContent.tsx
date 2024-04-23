import { FC } from "react";

import Typography from "~/components/typography";
import CategoryCard from "~/components/category-card";

import * as S from "./styles";
import { cards } from "./constants";

const HomeSearchContent: FC = () => {
  return (
    <div className={S.wrapperStyle}>
      <Typography.H2 className={S.headingStyle}>Search for content</Typography.H2>
      <div className={S.cardsWrapper}>
        {cards.map((card, index) => (
          <CategoryCard key={card.borderStyle} cardNum={index + 1} {...card} />
        ))}
      </div>
    </div>
  );
};

export default HomeSearchContent;
