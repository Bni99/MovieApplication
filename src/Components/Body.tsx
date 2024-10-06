import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
