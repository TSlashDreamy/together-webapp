import PlaybackSDKWrapper from "~/containers/playback-sdk-wrapper";
import Notification from "~/components/notification";

import Configurator from "~/configuration";
import { AppRouter } from "~/router/router";

const App = () => {
  return (
    <>
      <PlaybackSDKWrapper>
        <Configurator />
        <Notification />
        <AppRouter />
      </PlaybackSDKWrapper>
    </>
  );
};

export default App;
