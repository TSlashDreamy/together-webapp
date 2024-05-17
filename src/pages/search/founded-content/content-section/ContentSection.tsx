import { FC, useEffect, useRef } from "react";
import { IconType } from "react-icons";
import { IoChevronBackOutline as BackIcon } from "react-icons/io5";
import { IoChevronForwardOutline as ForwardIcon } from "react-icons/io5";

import IconButton from "~/components/icon-button";
import ContentCard from "~/components/content-card";
import Typography from "~/components/typography";

import { usePlayer } from "~/hooks/usePlayer";

import { ISearchResult } from "~/types";
import * as S from "./styles";

interface IProps {
  section: { name: string; Icon: IconType };
  searchResults: ISearchResult | null;
}

const ContentSection: FC<IProps> = ({ searchResults, section }) => {
  const { addToQueue } = usePlayer();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { Icon, name } = section;

  const handleScrollSection = (forward: boolean = true) => {
    const wrapperGap = Number(getComputedStyle(sectionRef.current as HTMLDivElement).gap.split("px")[0]);
    const cardWidth = Number(getComputedStyle(sectionRef.current?.firstChild as HTMLDivElement).width.split("px")[0]);
    const offsetX = wrapperGap + cardWidth;
    sectionRef.current?.scrollBy({ left: forward ? offsetX : offsetX * -1, behavior: "smooth" });
  };

  useEffect(() => {
    sectionRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [searchResults]);

  return (
    <div className={S.wrapper}>
      <div className={S.sectionHeader}>
        <Icon className={S.icon} />
        <Typography.H4 className={S.header}>{name}</Typography.H4>
      </div>
      <div className={S.contentWrapper}>
        <IconButton Icon={BackIcon} onClick={() => handleScrollSection(false)} />
        <div ref={sectionRef} className={S.cardsWrapper}>
          {searchResults?.songs.map((result) => (
            // key ignored for transitions!!
            <ContentCard track={result} onButtonClick={addToQueue} />
          ))}
        </div>
        <IconButton Icon={ForwardIcon} onClick={() => handleScrollSection()} />
      </div>
    </div>
  );
};

export default ContentSection;
