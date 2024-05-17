import { FC } from "react";

import PageWrapper from "~/components/page-wrapper";
import TopBar from "./top-bar";
import FoundedContent from "./founded-content";
import HistorySection from "./history-section";

import { useAppSelector } from "~/hooks/useRedux";

const SearchPage: FC = () => {
  const { searchResults, mode } = useAppSelector((state) => state.search);

  return (
    <PageWrapper>
      <TopBar mode={mode} />
      {searchResults ? <FoundedContent searchResults={searchResults} /> : <HistorySection />}
    </PageWrapper>
  );
};

export default SearchPage;
