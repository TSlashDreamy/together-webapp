import { FC, useEffect, useState } from "react";
import { RiSearch2Fill as SearchIcon } from "react-icons/ri";

import ContentChip from "~/components/content-chip";
import Form from "~/components/form";
import Input from "~/components/input";
import IconButton from "~/components/icon-button";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import useForm from "~/hooks/useForm";
import { useSearch } from "~/hooks/useSearch";

import { validate as searchValidate } from "~/validators/searchValidator";
import { resetSearchResults, setMode } from "~/redux/slices/searchSlice";
import { chips, Inputs, SearchChips } from "./constants";
import { InputTypes } from "~/types";
import * as S from "./styles";

interface ISearchField {
  search: string;
}

interface IProps {
  mode: SearchChips;
}

const TopBar: FC<IProps> = ({ mode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.search);
  const { search } = useSearch();

  const handleSearch = async (values: ISearchField) => {
    await search(values.search);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSwitchMode = (modeToSwitch: SearchChips) => {
    dispatch(setMode(modeToSwitch));
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ISearchField>({ search: "" }, handleSearch, searchValidate);

  useEffect(() => {
    return () => {
      dispatch(resetSearchResults());
    };
  }, [dispatch]);

  useEffect(() => {
    const offset = 100;
    const setScrolled = () => {
      setIsScrolled(window.scrollY > offset);
    };

    window.addEventListener("scroll", setScrolled);

    return () => {
      window.removeEventListener("scroll", setScrolled);
    };
  }, []);

  return (
    <div
      className={S.wrapper}
      style={{
        background: isScrolled ? "#5B5B5B1A" : "transparent",
        padding: isScrolled ? "25px" : "0",
        backdropFilter: isScrolled ? "blur(100px)" : "blur(0)",
        justifyContent: isScrolled ? "center" : "start",
      }}
    >
      <Form onSubmit={handleSubmit} className={S.form}>
        <Input
          name={Inputs.Search}
          placeholder={"Type your search query here..."}
          value={values.search}
          error={errors.search}
          type={InputTypes.Text}
          onChange={handleChange}
        />
        <IconButton Icon={SearchIcon} type={"submit"} isLoading={isLoading} />
      </Form>
      <div className={S.chipsWrapper}>
        {chips.map((chip) => (
          <ContentChip
            key={chip.name}
            Icon={chip.Icon}
            style={chip.style}
            active={chip.name === mode}
            name={chip.name}
            disabled={chip.disabled}
            onClick={() => handleSwitchMode(chip.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopBar;
