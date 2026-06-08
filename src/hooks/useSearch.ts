import { FirebaseError } from "firebase/app";

import { useAppDispatch, useAppSelector } from "~/hooks/useRedux";
// import { useSpotify } from "~/hooks/useSpotify";

import { showNotification } from "~/redux/slices/notificationSlice";
import { addToHistory, resetHistory, resetIsLoading, setHistory, setIsLoading, setSearchResults, setViewMode } from "~/redux/slices/searchSlice";

import { historyKey } from "~/pages/search/top-bar/constants";
import { ISearchResult, NotificationType } from "~/types";
import { ViewModes } from "~/pages/search/founded-content/view-filter/constants";
import { useState } from "react";

export const useSearch = () => {
  const [searchResults, setSearchResultss] = useState<ISearchResult>();
  const dispatch = useAppDispatch();
  // const { search: trackSearch, searchNext } = useSpotify();
  const { history, viewMode, searchQuery } = useAppSelector((state) => state.search);

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

  const search = async (_: string) => {
    try {
      dispatch(setIsLoading());
      // const { tracks } = await trackSearch(query);
      // dispatch(setSearchResults(tracks));
      // addHistory(query);
      // dispatch(setSearchQuery(query));
      setTimeout(() => {
        const demoSong = {
          name: "Demo name",
          author: "Demo Author",
          duration: 777777,
          image: "https://github.com/TSlashDreamy/together-webapp/blob/main/preview/Search.png?raw=true",
          trackUri: "",
          requestedBy: "",
        };
        const demoResult: ISearchResult = {
          songs: Array.from({ length: 22 }, () => demoSong),
          next: "string",
          total: 22,
        };

        dispatch(setSearchResults(demoResult));
        setSearchResultss(demoResult);
      }, 1000);
    } catch (e) {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: e instanceof FirebaseError ? e.message : "Something went wrong (Search)",
        }),
      );
    } finally {
      dispatch(resetIsLoading());
    }
  };

  const loadMore = async () => {
    // try {
    //   if (!searchResults?.next) return null;
    //   dispatch(setIsLoading());
    //   const { tracks } = await searchNext(searchResults?.next);
    //   dispatch(setSearchResults({ ...tracks, songs: [...searchResults.songs, ...tracks.songs] }));
    // } catch (e) {
    //   dispatch(
    //     showNotification({
    //       type: NotificationType.Error,
    //       content: e instanceof FirebaseError ? e.message : "Something went wrong (Search)",
    //     }),
    //   );
    // }
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
