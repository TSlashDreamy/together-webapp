import { FC } from "react";

import HomeInfo from "~/containers/home-info";
import HomeSearchContent from "~/containers/home-search-content";

import Typography from "~/components/typography";
import Divider from "~/components/divider";

import * as S from "./styles";

const HomePage: FC = () => {
  return (
    <div className={S.wrapperStyle}>
      <div className={S.headerStyle}>
        <Typography.H1>User's homepage</Typography.H1>
      </div>
      <HomeInfo />
      <Divider>OR</Divider>
      <HomeSearchContent />
    </div>
  );
};

export default HomePage;
