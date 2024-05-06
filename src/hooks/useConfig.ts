import { AppState } from "~/redux/slices/appSlice";

import { useAppSelector } from "~/hooks/useRedux";

import { IAppAppearance } from "~/types";
import { configKey } from "~/configuration/constants";
import { IAppServices } from "~/services/types";

type updateOptions =
  | AppState
  | IAppAppearance
  | IAppServices
  | IAppServices["spotify"]
  | IAppServices["soundCloud"]
  | IAppServices["youTube"];

export const useConfig = () => {
  const { appearance, services } = useAppSelector((state) => state.app);

  const _updateLocalStorage = (updateObject: object) => {
    localStorage.removeItem(configKey);
    localStorage.setItem(configKey, JSON.stringify(updateObject));
    window.dispatchEvent(new Event("configUpdate"));
  };

  const updateAppConfig = (updateOptions: updateOptions) => {
    // god forgive me (TS doesn't let me to do it the propper way)
    const { appearance: optionAppearance, services: optionServices } = updateOptions as AppState;
    const { floatingObjects } = updateOptions as IAppAppearance;
    const { soundCloud, spotify, youTube } = updateOptions as IAppServices;

    if (optionAppearance && optionServices) {
      _updateLocalStorage(updateOptions);
    }
    if (floatingObjects !== null) {
      const updatedOptions = { appearance: { floatingObjects }, services };
      _updateLocalStorage(updatedOptions);
    }
    if (spotify) {
      const updatedOptions = { appearance, services: { ...services, spotify } };
      _updateLocalStorage(updatedOptions);
    }
    if (soundCloud) {
      const updatedOptions = { appearance, services: { ...services, soundCloud } };
      _updateLocalStorage(updatedOptions);
    }
    if (youTube) {
      const updatedOptions = { appearance, services: { ...services, youTube } };
      _updateLocalStorage(updatedOptions);
    }
  };

  return {
    appearance,
    services,
    updateAppConfig,
  };
};
