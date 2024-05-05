import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/useRedux";

import { updateConfig } from "~/redux/slices/appSlice";
import { configKey, initialConfig } from "./constants";

const Configurator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const config = localStorage.getItem(configKey);
    if (!config) localStorage.setItem(configKey, JSON.stringify(initialConfig));
    else dispatch(updateConfig(JSON.parse(localStorage.getItem(configKey) as string)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateAppState = () => {
      const appLocalConfig = localStorage.getItem(configKey);
      dispatch(updateConfig(JSON.parse(appLocalConfig as string)));
    };

    window.addEventListener("configUpdate", updateAppState);

    return () => {
      window.removeEventListener("configUpdate", updateAppState);
    };
  });

  return <></>;
};

export default Configurator;
