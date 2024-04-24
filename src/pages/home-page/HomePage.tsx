import { FC } from "react";

import HomeInfo from "~/containers/home-info";
import HomeSearchContent from "~/containers/home-search-content";

import Typography from "~/components/typography";
import Divider from "~/components/divider";

import * as S from "./styles";
import { useAppSelector } from "~/hooks/useRedux";

const HomePage: FC = () => {
  const { userName } = useAppSelector((state) => state.user);

  return (
    <div className={S.wrapperStyle}>
      <div>
        <Typography.H1>{userName ? `${userName}'s homepage` : '👋 Bye-bye'}</Typography.H1>
      </div>
      <HomeInfo />
      <Divider>OR</Divider>
      <HomeSearchContent />
    </div>
  );
};

export default HomePage;
