import { AppRouter } from "~/router/router";
import Notification from "~/components/notification";
import Configurator from "~/configuration";

const App = () => {
  return (
    <>
      <Configurator />
      <Notification />
      <AppRouter />
    </>
  );
};

export default App;
