import { initialSevicesState } from "~/services/constants";

export const configKey = "app-config";

export const initialConfig = {
  appearance: {
    floatingObjects: true,
  },
  services: {
    ...initialSevicesState,
  },
};
