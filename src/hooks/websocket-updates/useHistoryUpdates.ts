import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/useRedux";

import { setHistory } from "~/redux/slices/searchSlice";

import { historyKey } from "~/pages/search/top-bar/constants";

export const useHistoryUpdates = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const localHistory = localStorage.getItem(historyKey);
    if (!localHistory) return;
    dispatch(setHistory(JSON.parse(localHistory).history || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
