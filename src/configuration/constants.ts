export const configKey = "app-config";

export const initialConfig = {
  appearance: {
    floatingObjects: true,
  },
  services: {
    spotify: {
      token: null,
      status: "Unactive",
    },
    soundCloud: {
      token: null,
      status: "Unactive",
    },
    youTube: {
      token: null,
      status: "Unactive",
    },
  },
};
