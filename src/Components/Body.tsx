import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import { UserProvider } from "./providers/UserProvider";
import Browse from "./Browse";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/browse", element: <Browse /> },
  ]);

  return (
    <div>
      <UserProvider>
        <RouterProvider router={appRouter} />
      </UserProvider>
    </div>
  );
};

export default Body;
