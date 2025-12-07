import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout.jsx";
import Home from "../pages/Home.jsx";
import Error from "../pages/Error.jsx";
import About from "../pages/About.jsx";
import Details from "../pages/Details.jsx";
import Recipes from "../pages/Recipes.jsx";

export const browserRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <Error/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/detail/:id",
                element: <Details/>
            },
            {
                path: "/recipes",
                element: <Recipes/>
            },
        ],
    },
    {
        path: '*',
        element: <Error/>
    }
])