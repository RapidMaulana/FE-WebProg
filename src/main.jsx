import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { browserRoutes } from "./routes/Routes.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { FormProvider } from "./context/FormContext.jsx";

createRoot(document.getElementById("root")).render(
  <FormProvider>
    <AuthProvider>
      <RouterProvider router={browserRoutes} />
    </AuthProvider>
  </FormProvider>
);
