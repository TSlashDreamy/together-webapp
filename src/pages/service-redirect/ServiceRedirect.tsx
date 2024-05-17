import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MessageCard from "~/components/message-card";

import { useConfig } from "~/hooks/useConfig";
import { useSpotify } from "~/hooks/useSpotify";

import { statuses } from "./constants";
import { routes } from "~/router/constants";
import { ServiceStatus, spotifyErrorState } from "~/services/constants";
import { IAppServices } from "~/services/types";

const code = new URLSearchParams(window.location.search).get("code");

const ServiceRedirect: FC = () => {
  const [status, setStatus] = useState(statuses.Fail);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const { updateAppConfig } = useConfig();
  const { getSpotifyToken } = useSpotify();
  const navigate = useNavigate();

  const startTimeout = () => {
    return setTimeout(() => {
      navigate(routes.app.settings);
    }, 5000);
  };

  useEffect(() => {
    if (!code) return;
    setStatus(statuses.Loading);
    getSpotifyToken(code)
      .then((data) => {
        if (data) {
          const { access_token, refresh_token, expires_in } = data;
          const newState = {
            spotify: { access_token, expires_in, refresh_token, status: ServiceStatus.Active },
          } as IAppServices;

          setStatus({ ...statuses.Success, title: statuses.Success.title.concat(" | Spotify") });
          updateAppConfig(newState);
        }
      })
      .catch(() => {
        setStatus(statuses.Fail);
        updateAppConfig(spotifyErrorState);
        setTimerId(startTimeout());
      })

    if (status === statuses.Fail) setTimerId(startTimeout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timerId as NodeJS.Timeout);
    };
  }, [timerId]);

  return (
    <MessageCard iconStyle={status.style} Icon={status.Icon} title={status.title} description={status.desription} />
  );
};

export default ServiceRedirect;
