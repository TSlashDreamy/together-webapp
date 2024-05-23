import { FirebaseError } from "firebase/app";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { useSpotify } from "~/hooks/useSpotify";

import { showNotification } from "~/redux/slices/notificationSlice";
import { addToHistory, resetHistory, setHistory, setIsLoading, setSearchQuery, setSearchResults, setViewMode } from "~/redux/slices/searchSlice";

import { historyKey } from "~/pages/search/top-bar/constants";
import { NotificationType } from "~/types";
import { ViewModes } from "~/pages/search/founded-content/view-filter/constants";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const { search: trackSearch, searchNext } = useSpotify();
  const { history, viewMode, searchResults, searchQuery } = useAppSelector((state) => state.search);

  const addHistory = (query: string) => {
    dispatch(addToHistory(query));
    localStorage.setItem(historyKey, JSON.stringify({ history: Array.from(new Set([...history, query])), viewMode }));
  };

  const clearHistory = () => {
    dispatch(resetHistory());
    localStorage.setItem(historyKey, JSON.stringify({ history: [], viewMode }));
  };

  const clearHistoryItem = (queryItem: string) => {
    const newHistory = history.filter((item) => item !== queryItem);
    dispatch(setHistory(newHistory));
    localStorage.setItem(historyKey, JSON.stringify({ history: newHistory, viewMode }));
  };

  const changeViewMode = (mode: ViewModes) => {
    dispatch(setViewMode(mode));
    localStorage.setItem(historyKey, JSON.stringify({ history, viewMode: mode }));
  };

  const search = async (query: string) => {
    try {
      dispatch(setIsLoading());
      const { tracks } = await trackSearch(query);
      dispatch(setSearchResults(tracks));
      addHistory(query);
      dispatch(setSearchQuery(query));
    } catch (e) {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Search)",
        })
      );
    }
  };

  const loadMore = async () => {
    try {
      if (!searchResults?.next) return null;
      dispatch(setIsLoading());
      const { tracks } = await searchNext(searchResults?.next);
      dispatch(setSearchResults({ ...tracks, songs: [...searchResults.songs, ...tracks.songs] }));
    } catch (e) {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Search)",
        })
      );
    }
  };

  return {
    search,
    loadMore,
    addHistory,
    clearHistory,
    clearHistoryItem,
    changeViewMode,
    history,
    searchResults,
    searchQuery,
  };
};
