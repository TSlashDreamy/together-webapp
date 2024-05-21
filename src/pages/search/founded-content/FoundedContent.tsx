import { FC } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";

import NoRoomModal from "~/containers/no-room-modal";
import Typography from "~/components/typography";
import ContentSection from "./content-section";

import { useModal } from "~/hooks/useModal";

import SearchResultIcon from "~/assets/icons/navbar-icons/searchIcon.svg?react";
import { ISearchResult } from "~/types";

import * as S from "./styles";

interface IProps {
  searchResults: ISearchResult | null;
}

const FoundedContent: FC<IProps> = ({ searchResults }) => {
  const { isOpen, hideModal, showModal } = useModal();
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
        </div>
        <div className={S.sectionsWrapper}>
          <ContentSection section={{ name: "Spotify", Icon: SpotifyIcon }} searchResults={searchResults} showAlert={showModal} />
        </div>
      </div>
    </>
  );
};

export default FoundedContent;
