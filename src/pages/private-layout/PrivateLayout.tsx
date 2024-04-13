import { Outlet } from "react-router-dom";
import LandingHeader from "~/components/landing-header";

const PrivateLayout = () => {
  return (
    <>
      <LandingHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;