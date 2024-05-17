import { FC, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { FaHistory as HistoryIcon } from "react-icons/fa";
import { GrFormClose as CloseIcon } from "react-icons/gr";

import Typography from "~/components/typography";
import IconButton from "~/components/icon-button";

import { useSearch } from "~/hooks/useSearch";
import * as S from "./styles";

interface IProps {
  queryName: string;
}

const HistoryItem: FC<IProps> = ({ queryName }) => {
  const { search, clearHistoryItem } = useSearch();
  const classes = twMerge(S.wrapperStyles);

  const handleClearItem = (e: MouseEvent<HTMLButtonElement>, item: string) => {
    e.stopPropagation();
    clearHistoryItem(item);
  };

  return (
    <div onClick={() => search(queryName)} className={classes}>
      <div className={S.nameWrapper}>
        <HistoryIcon className={S.nameIcon} />
        <Typography.SPAN className={S.name}>{queryName}</Typography.SPAN>
      </div>
      <IconButton
        className={S.closeIcon}
        Icon={CloseIcon}
        iconOnly
        small
        onClick={(e) => handleClearItem(e, queryName)}
      />
    </div>
  );
};

export default HistoryItem;
