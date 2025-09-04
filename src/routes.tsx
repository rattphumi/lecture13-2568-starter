import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import TodoCardPage from "./pages/TodoCardPage";
import TodoTablePage from "./pages/TodoTablePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // localhost:xxxx/
      { index: true, element: <TodoCardPage /> },
      // localhost:xxxx/todotable
      { path: "todotable", element: <TodoTablePage /> },
    ],
  },
]);
