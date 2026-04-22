import { createBrowserRouter, Navigate } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { Main } from "./pages/Main/Main";
import { Question } from "./pages/Question/Question";
import { NotFound } from "./components/NotFound/NotFound";

export const appRouter = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/questions" replace />,
            },
            {
                path: "questions",
                index: true,
                element: <Main />,
            },
            { path: "questions/:id", element: <Question /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
