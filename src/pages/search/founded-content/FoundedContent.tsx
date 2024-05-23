import { FC } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";

import NoRoomModal from "~/containers/no-room-modal";
import Typography from "~/components/typography";
import ContentItem from "~/components/content-item";
import Logo from "~/components/logo";
import ContentSection from "./content-section";
import ViewFilter from "./view-filter";

import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useModal } from "~/hooks/useModal";
import { useAppSelector } from "~/hooks/useRedux";
import { useSearch } from "~/hooks/useSearch";

import SearchResultIcon from "~/assets/icons/navbar-icons/searchIcon.svg?react";
import { ViewModes } from "./view-filter/constants";
import { ISearchResult } from "~/types";

import * as S from "./styles";

interface IProps {
  searchResults: ISearchResult | null;
}

const FoundedContent: FC<IProps> = ({ searchResults }) => {
  const { isOpen, hideModal, showModal } = useModal();
  const { loadMore } = useSearch();
  const { viewMode } = useAppSelector((state) => state.search);

  const loaderRef = useIntersectionObserver(loadMore);

  return (
    <>
      <NoRoomModal isOpen={isOpen} onCancel={hideModal} />
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
          <ViewFilter />
        </div>
        {viewMode === ViewModes.Cards && (
          <div className={S.sectionsWrapper}>
            <ContentSection section={{ name: "Spotify", Icon: SpotifyIcon }} searchResults={searchResults} showAlert={showModal} />
          </div>
        )}
        {viewMode === ViewModes.Column && (
          <div className={S.columnViewWrapper}>
            {searchResults?.songs.map((song, index) => (
              <ContentItem key={index} track={song} showAlert={showModal} />
            ))}
            <div className={S.logoWrapper}>
              <Logo ref={loaderRef} onlyLogo svgStyles="animate-logoLoading" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FoundedContent;
