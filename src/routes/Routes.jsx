import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../pages/Layout.jsx";
import Home from "../pages/Home.jsx";
import Error from "../pages/Error.jsx";
import About from "../pages/About.jsx";
import Details from "../pages/Details.jsx";
import Recipes from "../pages/Recipes.jsx";

import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Profile from "../pages/Auth/Profile.jsx";

export const browserRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/recipes",
        children: [
          {
            index: true,
            element: <Recipes />,
          },
          {
            path: ":id",
            element: <Details />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />
      },
      
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
