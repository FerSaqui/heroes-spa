import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { MarvelPage } from "../heroes/pages/MarvelPage";
import { DCPage } from "../heroes/pages/DCPage";
import { LoginPage } from "../auth/pages/LoginPage";
import { SearchPage } from "../heroes/pages/SearchPage";
import { Hero } from "../heroes/pages/Hero";
import { HeroesApp } from "../HeroesApp";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const routesArray = [
    {
        path: "/",
        element: (
            <PrivateRoutes>
                <HeroesApp />
            </PrivateRoutes>
        ),
        children: [
            {
                index: true,
                element: <MarvelPage />    // The default component to load at '/'
            },
            {
                path: "marvel",
                element: <MarvelPage />,
            },
            {
                path: "dc",
                element: <DCPage />,
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "hero/:id",
                element: <Hero />
            }
        ]
    },
    {
        path: "/login",
        element: (
            <PublicRoutes>
                <LoginPage />
            </PublicRoutes>
        )
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />
    }
];

const browserRouter = createBrowserRouter(routesArray);

export const Router = () => {
    return <RouterProvider router={ browserRouter } />
}