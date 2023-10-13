import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DataContextProvider from "./context/DataContext.tsx";
import Home from "./views/Home.tsx";
import PostCreator, { loader } from "./views/PostCreator.tsx";
import LandingPage from "./views/LandingPage.tsx";
import SinglePost from "./views/SinglePost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/create-post",
        element: <PostCreator />,
      },
      {
        path: "/edit-post/:id",
        element: <PostCreator />,
        loader: loader
      },
      {
        path: "",
        element: <Home />
      },
      {
        path: "/:year/:month/:day/:id",
        element: <SinglePost />
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <DataContextProvider>
    <RouterProvider router={router} />
  </DataContextProvider>
);
