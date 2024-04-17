import { BrowserRouter } from "react-router-dom";
import RouteAnimator from "~/router/route-animator";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouteAnimator />
    </BrowserRouter>
  );
};

export default AppRouter;
