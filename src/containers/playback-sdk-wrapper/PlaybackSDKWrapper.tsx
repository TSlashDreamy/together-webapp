import { FC, HTMLAttributes } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

import { useSpotify } from "~/hooks/useSpotify";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const PlaybackSDKWrapper: FC<IProps> = ({ children }) => {
  const { getAccessToken, current_access_token } = useSpotify();

  return (
    <WebPlaybackSDK
      initialDeviceName="Together webapp"
      getOAuthToken={getAccessToken}
      initialVolume={0.5}
      connectOnInitialized={Boolean(current_access_token)}
    >
      {children}
    </WebPlaybackSDK>
  );
};

export default PlaybackSDKWrapper;
