import PlaybackSDKWrapper from "~/containers/playback-sdk-wrapper";
import Notification from "~/components/notification";

import Configurator from "~/configuration";
import { AppRouter } from "~/router/router";
import NotificationOverlay from "./components/notification-overlay/NotificationOverlay";

const App = () => {
  return (
    <>
      <PlaybackSDKWrapper>
        <Configurator />
        <Notification />
        <AppRouter />
        <NotificationOverlay />
      </PlaybackSDKWrapper>
    </>
  );
};

export default App;
