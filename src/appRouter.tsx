import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

const BaseLayout = lazy(() => import('./layouts/BaseLayout'));
const Main = lazy(() => import('./pages/Main/Main'));
const Question = lazy(() => import('./pages/Question/Question'));
const Interview = lazy(() => import('./pages/Interview/Interview'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const SelectInterview = lazy(() => import('./pages/SelectInterview/SelectInterview'))
const Statistics = lazy(() => import('./pages/Statistics/Statistics'))

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/questions" replace />,
            },
            {
                path: "questions",
                element: <Main />
            },
            {
                path: "questions/:id", element: <Question />
            },
            {
                path: 'interview', element: <SelectInterview />
            },
            {
                path: 'interview/:id', element: <Interview />
            },
            {
                path: 'interview/:id', element: <Interview />
            },
            {
                path: 'statistics/:id', element: <Statistics />
            },
            {
                path: "*", element: <NotFound />
            },
        ],
    },
]);
