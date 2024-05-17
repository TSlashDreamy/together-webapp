import { useCallback, useEffect } from "react";

import { useWebSocketUpdates } from "~/hooks/websocket-updates/useWebsocketUpdates";
import { useAppDispatch } from "~/hooks/useRedux";
import { useConfig } from "~/hooks/useConfig";
import { useSpotify } from "~/hooks/useSpotify";

import { updateConfig } from "~/redux/slices/appSlice";
import { configKey, initialConfig } from "./constants";
import { ServiceStatus, spotifyErrorState } from "~/services/constants";
import { IAppServices } from "~/services/types";

const Configurator = () => {
  const dispatch = useAppDispatch();
  const { updateAppConfig } = useConfig();
  const { refreshSpotifyToken, current_refresh_token, current_expires_in } = useSpotify();
  useWebSocketUpdates(); // Handles all websocket updates (without additional rerenders)

  const tokenRefresher = useCallback(() => {
    refreshSpotifyToken()
      .then((data) => {
        const { access_token, refresh_token, expires_in } = data;
        const refreshedState = {
          spotify: { access_token, refresh_token, expires_in, status: ServiceStatus.Active },
        } as IAppServices;

        updateAppConfig(refreshedState);
      })
      .catch(() => {
        updateAppConfig(spotifyErrorState);
      });
  }, [refreshSpotifyToken, updateAppConfig]);

  useEffect(() => {
    const config = localStorage.getItem(configKey);
    if (!config) localStorage.setItem(configKey, JSON.stringify(initialConfig));
    else dispatch(updateConfig(JSON.parse(config)));
    if (current_refresh_token) tokenRefresher();
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
  }, [dispatch]);

  useEffect(() => {
    let refresh_timer: NodeJS.Timeout;

    if (current_refresh_token) {
      refresh_timer = setTimeout(() => {
        tokenRefresher();
      }, ((current_expires_in as number) - 60) * 1000);
    }

    return () => {
      clearTimeout(refresh_timer);
    };
  }, [current_expires_in, current_refresh_token, refreshSpotifyToken, tokenRefresher, updateAppConfig]);

  return <></>;
};

export default Configurator;
