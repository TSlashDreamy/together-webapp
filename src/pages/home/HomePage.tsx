import { FC } from "react";

import HomeInfo from "~/containers/home-info";
import HomeSearchContent from "~/containers/home-search-content";

import Typography from "~/components/typography";
import Divider from "~/components/divider";

import { useAppSelector } from "~/hooks/useRedux";
import PageWrapper from "~/components/page-wrapper";

const HomePage: FC = () => {
  const { userName } = useAppSelector((state) => state.user);

  return (
    <PageWrapper>
      <div>
        <Typography.H1>{userName ? `${userName}'s homepage` : "👋 Bye-bye"}</Typography.H1>
      </div>
      <HomeInfo />
      <Divider>OR</Divider>
      <HomeSearchContent />
    </PageWrapper>
  );
};

export default HomePage;
