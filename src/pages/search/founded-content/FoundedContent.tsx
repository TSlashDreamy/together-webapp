import { FC } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";

import Typography from "~/components/typography";

import SearchResultIcon from "~/assets/icons/navbar-icons/searchIcon.svg?react";
import { ISearchResult } from "~/types";
import ContentSection from "./content-section";

import * as S from "./styles";

interface IProps {
  searchResults: ISearchResult | null;
}

const FoundedContent: FC<IProps> = ({ searchResults }) => {
  return (
    <div className={S.wrapper}>
      <div className={S.header}>
        <div className={S.text}>
          <SearchResultIcon className={S.searchIcon} />
          <Typography.H2 className={S.h2}>Your search results</Typography.H2>
          <Typography.SPAN className={S.span}>({searchResults?.total || 0} results)</Typography.SPAN>
          <div className={S.serviceIconsWrapper}>
            <SpotifyIcon className={S.serviceIcon} />
          </div>
        </div>
      </div>
      <div className={S.sectionsWrapper}>
        <ContentSection section={{ name: "Spotify", Icon: SpotifyIcon }} searchResults={searchResults} />
      </div>
    </div>
  );
};

export default FoundedContent;
