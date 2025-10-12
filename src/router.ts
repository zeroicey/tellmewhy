import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout";
import IndexPage from "./pages";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import QuestionPage from "./pages/question";
import ProtectedLayout from "./components/layouts/protected-layout";
import AskPage from "./pages/ask";
import QuestionIdPage from "./pages/question/id";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: IndexPage },
      { path: "signin", Component: SignInPage },
      { path: "signup", Component: SignUpPage },
      {
        Component: ProtectedLayout,
        children: [
          {
            path: "questions",
            children: [
              {
                index: true,
                Component: QuestionPage,
              },
              {
                path: ":questionId",
                Component: QuestionIdPage,
              },
            ],
          },
          {
            path: "ask",
            Component: AskPage,
          },
        ],
      },
    ],
  },
]);

export default router;
