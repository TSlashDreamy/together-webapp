import { FC } from "react";
import { TbCardsFilled as CardsIcon } from "react-icons/tb";
import { BsList as ColumnIcon } from "react-icons/bs";

import ContentChip from "~/components/content-chip";

import { useAppSelector } from "~/hooks/useRedux";
import { useSearch } from "~/hooks/useSearch";

import { viewChipsStyling, ViewModes } from "./constants";
import * as S from "./styles";

const ViewFilter: FC = () => {
  const { changeViewMode } = useSearch();
  const { viewMode } = useAppSelector((state) => state.search);

  return (
    <div className={S.wrapper}>
      <ContentChip
        Icon={CardsIcon}
        name={ViewModes.Cards}
        style={viewChipsStyling}
        active={ViewModes.Cards === viewMode}
        onClick={() => changeViewMode(ViewModes.Cards)}
      />
      <ContentChip
        Icon={ColumnIcon}
        name={ViewModes.Column}
        style={viewChipsStyling}
        active={ViewModes.Column === viewMode}
        onClick={() => changeViewMode(ViewModes.Column)}
      />
    </div>
  );
};

export default ViewFilter;
