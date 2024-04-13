import { BrowserRouter } from "react-router-dom";

import LandingHeader from "~/components/landing-header";
import RouteAnimator from "~/router/route-animator";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <LandingHeader />
      <RouteAnimator />
    </BrowserRouter>
  );
};

export default AppRouter;
