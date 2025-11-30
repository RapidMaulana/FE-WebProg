import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout.jsx";
import Home from "../pages/Home.jsx";
import Error from "../pages/Error.jsx";

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
        ],
    },
    {
        path: '*',
        element: <Error/>
    }
])