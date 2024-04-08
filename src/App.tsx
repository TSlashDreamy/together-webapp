import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "~/pages/landing-page";
import Root from "~/pages/root";
import ErrorPage from "~/pages/error-page/ErrorPage";
import LoginPage from "~/pages/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
