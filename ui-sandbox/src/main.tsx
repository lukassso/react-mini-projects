import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.tsx";
import App1 from "./pages/App1/App1.tsx";
import App2 from "./pages/App2/App2.tsx";
import App3 from './pages/App3/App3.tsx';
import { Home } from "./pages/Home/Home.tsx";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
