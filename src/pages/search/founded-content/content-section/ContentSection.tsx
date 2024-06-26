import { FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { IoChevronBackOutline as BackIcon } from "react-icons/io5";
import { IoChevronForwardOutline as ForwardIcon } from "react-icons/io5";
import { IoAddOutline as AddIcon } from "react-icons/io5";

import IconButton from "~/components/icon-button";
import ContentCard from "~/components/content-card";
import Typography from "~/components/typography";
import Logo from "~/components/logo";

import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { usePlayer } from "~/hooks/usePlayer";
import { useUser } from "~/hooks/useUser";
import { useSearch } from "~/hooks/useSearch";

import { ISearchResult, ISpotifyTrack } from "~/types";
import * as S from "./styles";

interface IProps {
  section: { name: string; Icon: IconType };
  searchResults: ISearchResult | null;
  showAlert: () => void;
}

const ContentSection: FC<IProps> = ({ searchResults, section, showAlert }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const { roomId } = useUser();
  const { addToQueue, isLoading } = usePlayer();
  const { loadMore, searchQuery } = useSearch();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { Icon, name } = section;

  const loaderRef = useIntersectionObserver(loadMore);

  const handleAddToQueue = (track: ISpotifyTrack) => {
    if (!roomId) showAlert();
    else addToQueue(track);
  };

  const handleScrollSection = (forward: boolean = true) => {
    if (isScrolling) return;
    setIsScrolling(true);

    const wrapperGap = Number(getComputedStyle(sectionRef.current as HTMLDivElement).gap.split("px")[0]);
    const cardWidth = Number(getComputedStyle(sectionRef.current?.firstChild as HTMLDivElement).width.split("px")[0]);
    const offsetX = wrapperGap + cardWidth;

    sectionRef.current?.scrollBy({ left: forward ? offsetX : offsetX * -1, behavior: "smooth" });
    setTimeout(() => {
      setIsScrolling(false);
    }, 250);
  };

  useEffect(() => {
    sectionRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [searchQuery]);

  return (
    <div className={S.wrapper}>
      <div className={S.sectionHeader}>
        <Icon className={S.icon} />
        <Typography.H4 className={S.header}>{name}</Typography.H4>
      </div>
      <div className={S.contentWrapper}>
        <IconButton Icon={BackIcon} onClick={() => handleScrollSection(false)} />
        <div ref={sectionRef} className={S.cardsWrapper}>
          {searchResults?.songs.map((result, index) => (
            <ContentCard key={index} ButtonIcon={AddIcon} isLoading={isLoading} track={result} onButtonClick={handleAddToQueue} />
          ))}
          <div className={S.logoWrapper}>
            <Logo ref={loaderRef} onlyLogo svgStyles="animate-logoLoading" />
          </div>
        </div>
        <IconButton Icon={ForwardIcon} onClick={() => handleScrollSection()} />
      </div>
    </div>
  );
};

export default ContentSection;
