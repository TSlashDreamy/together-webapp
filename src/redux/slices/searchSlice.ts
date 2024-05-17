import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchChips } from "~/pages/search/top-bar/constants";

import { ISearchResult } from "~/types";

export interface SearchState {
  isLoading: boolean;
  searchResults: ISearchResult | null;
  mode: SearchChips;
  history: string[];
}

const initialState: SearchState = {
  isLoading: false,
  searchResults: null,
  mode: SearchChips.All,
  history: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
    setSearchResults: (state, action: PayloadAction<ISearchResult>) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    resetSearchResults: (state) => {
      state.searchResults = null;
    },
    setMode: (state, action: PayloadAction<SearchChips>) => {
      state.mode = action.payload;
    },
    setHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      state.history = Array.from(new Set([...state.history, action.payload]));
    },
    resetHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  setIsLoading,
  resetIsLoading,
  setSearchResults,
  resetSearchResults,
  setMode,
  setHistory,
  addToHistory,
  resetHistory,
} = searchSlice.actions;
export default searchSlice.reducer;
