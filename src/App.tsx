import { AppRouter } from "~/router/router";
import Notification from "~/components/notification";

const App = () => {
  return (
    <>
      <Notification />
      <AppRouter />
    </>
  );
};

export default App;
