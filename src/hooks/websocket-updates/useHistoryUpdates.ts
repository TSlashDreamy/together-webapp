import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/useRedux";

import { setHistory, setViewMode } from "~/redux/slices/searchSlice";

import { historyKey } from "~/pages/search/top-bar/constants";
import { ViewModes } from "~/pages/search/founded-content/view-filter/constants";

export const useHistoryUpdates = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localHistory = localStorage.getItem(historyKey);
    if (!localHistory) return;
    dispatch(setHistory(JSON.parse(localHistory).history || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const localViewMode = localStorage.getItem(historyKey);
    if (!localViewMode) return;
    dispatch(setViewMode(JSON.parse(localViewMode).viewMode || ViewModes.Cards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
