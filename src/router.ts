import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout";
import IndexPage from "./pages";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import { AuthLoader } from "./components/loaders/auth-loader";
import QuestionPage from "./pages/question";
import { initializeAuth } from "./stores/auth";

await initializeAuth();

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: IndexPage },
      { path: "signin", Component: SignInPage },
      { path: "signup", Component: SignUpPage },
      {
        loader: AuthLoader,
        children: [
          {
            path: "questions",
            Component: QuestionPage,
          },
        ],
      },
    ],
  },
]);

export default router;
