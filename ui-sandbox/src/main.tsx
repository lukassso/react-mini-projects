import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import App1 from "./pages/App1/App1";
import App2 from "./pages/App2/App2";
import App3 from "./pages/App3/App3";
import App4 from "./pages/App4-ToDoList";
import App5 from "./pages/App5-images";
import App6 from "./pages/App6-chart-data";
import App7 from "./pages/App7-products";
import App8 from './pages/App8-Employee';
import { Home } from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "app1",
        element: <App1 />,
      },
      {
        path: "app2",
        element: <App2 />,
      },
      {
        path: "app3",
        element: <App3 />,
      },
      {
        path: "app4",
        element: <App4 />,
      },
      {
        path: "app5",
        element: <App5 />,
      },
      {
        path: "app6",
        element: <App6 />,
      },
      {
          path: "app7",
          element: <App7 />,
      },
      {
        path: 'app8',
        element: <App8 />,
        }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
