import { FC } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "~/components/typography";
import CategoryCard from "~/components/category-card";

import { useAppDispatch } from "~/hooks/useRedux";

import { cards } from "./constants";
import * as S from "./styles";
import { setMode } from "~/redux/slices/searchSlice";
import { SearchChips } from "~/pages/search/top-bar/constants";
import { routes } from "~/router/constants";

const HomeSearchContent: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearchFor = (mode: SearchChips) => {
    dispatch(setMode(mode));
    navigate(routes.app.search);
  };

  return (
    <div className={S.wrapperStyle}>
      <Typography.H2 className={S.headingStyle}>Search for content</Typography.H2>
      <div className={S.cardsWrapper}>
        {cards.map((card, index) => (
          <CategoryCard key={card.borderStyle} cardNum={index + 1} onClick={() => handleSearchFor(card.name)} {...card} />
        ))}
      </div>
    </div>
  );
};

export default HomeSearchContent;
