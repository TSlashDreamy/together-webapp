import { FirebaseError } from "firebase/app";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
import { useSpotify } from "~/hooks/useSpotify";

import { showNotification } from "~/redux/slices/notificationSlice";
import { addToHistory, resetHistory, setHistory, setIsLoading, setSearchResults } from "~/redux/slices/searchSlice";

import { historyKey } from "~/pages/search/top-bar/constants";
import { NotificationType } from "~/types";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const { search: trackSearch } = useSpotify();
  const { history } = useAppSelector((state) => state.search);

  const addHistory = (query: string) => {
    dispatch(addToHistory(query));
    localStorage.setItem(historyKey, JSON.stringify({ history: Array.from(new Set([...history, query])) }));
  };

  const clearHistory = () => {
    dispatch(resetHistory());
    localStorage.setItem(historyKey, JSON.stringify({ history: [] }));
  };

  const clearHistoryItem = (queryItem: string) => {
    const newHistory = history.filter((item) => item !== queryItem);
    dispatch(setHistory(newHistory));
    localStorage.setItem(historyKey, JSON.stringify({ history: newHistory }));
  }

  const search = async (query: string) => {
    try {
      dispatch(setIsLoading());
      const { tracks } = await trackSearch(query);
      dispatch(setSearchResults(tracks));
      addHistory(query);
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
    addHistory,
    clearHistory,
    clearHistoryItem,
    history,
  };
};
