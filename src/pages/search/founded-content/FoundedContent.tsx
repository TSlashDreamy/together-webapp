import { FC } from "react";
import { createPortal } from "react-dom";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";
import { BiFileFind as NotFoundedIcon } from "react-icons/bi";

import NoRoomModal from "~/containers/no-room-modal";
import ContentItem from "~/components/content-item";
import Logo from "~/components/logo";
import ContentSection from "./content-section";

import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useModal } from "~/hooks/useModal";
import { useAppSelector } from "~/hooks/useRedux";
import { useSearch } from "~/hooks/useSearch";

import { ViewModes } from "./view-filter/constants";
import { ISearchResult } from "~/types";

import * as S from "./styles";
import FoundedHeading from "./founded-heading";
import SectionDescription from "~/components/section-description";

interface IProps {
  searchResults: ISearchResult;
}

const FoundedContent: FC<IProps> = ({ searchResults }) => {
  const { isOpen, hideModal, showModal } = useModal();
  const { loadMore } = useSearch();
  const { viewMode } = useAppSelector((state) => state.search);

  const loaderRef = useIntersectionObserver(loadMore);

  return (
    <>
      <NoRoomModal isOpen={isOpen} onCancel={hideModal} />
      <div className={S.wrapper} style={{ height: searchResults.total > 0 ? "auto" : "100%" }}>
        {searchResults.total > 0 ? (
          <>
            <FoundedHeading searchResults={searchResults} />
            {viewMode === ViewModes.Cards && (
              <div className={S.sectionsWrapper}>
                <ContentSection section={{ name: "Spotify", Icon: SpotifyIcon }} searchResults={searchResults} showAlert={showModal} />
              </div>
            )}
            {viewMode === ViewModes.Column && (
              <div className={S.columnViewWrapper}>
                {searchResults.songs.map((song, index) => (
                  <ContentItem key={index} track={song} showAlert={showModal} />
                ))}
                <div className={S.logoWrapper}>
                  <Logo ref={loaderRef} onlyLogo svgStyles="animate-logoLoading" />
                </div>
              </div>
            )}
          </>
        ) : (
          createPortal(
            <SectionDescription
              Icon={NotFoundedIcon}
              title="Nothing founded :c (But we tried)"
              description="Check that you typed your query correctly, or try different keywords."
            />,
            document.getElementById("portal") as HTMLElement
          )
        )}
      </div>
    </>
  );
};

export default FoundedContent;
