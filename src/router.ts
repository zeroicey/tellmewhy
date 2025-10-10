import { createBrowserRouter } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import IndexPage from "./pages";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, Component: IndexPage }],
  },
]);

export default router;
