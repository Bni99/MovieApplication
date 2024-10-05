import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
