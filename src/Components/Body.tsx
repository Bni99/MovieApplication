import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import { UserProvider } from "./providers/UserProvider";
import Browse from "./Browse";
import Error from "./Error";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/browse", element: <Browse /> },
    { path: "/404", element: <Error /> },
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
