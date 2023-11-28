import { lazy } from "react";
import { PRIVATE_ROUTES } from "./paths";

export const privateRoutes = [
  {
    path: PRIVATE_ROUTES.DASHBOARD,
    Component: lazy(() => import("@pages/Dashboard")),
  },
  {
    path: PRIVATE_ROUTES.USERS,
    Component: lazy(() => import("@pages/Users")),
  },

  {
    path: PRIVATE_ROUTES.EMPLOYEES,
    Component: lazy(() => import("@pages/Employees")),
  },
  {
    path: PRIVATE_ROUTES.BRANDS,
    Component: lazy(() => import("@pages/Brands")),
  },
  {
    path: PRIVATE_ROUTES.PRODUCTS,
    Component: lazy(() => import("@pages/Products")),
  },
  {
    path: PRIVATE_ROUTES.CATEGORIES,
    Component: lazy(() => import("@pages/Categories")),
  },
  {
    path: PRIVATE_ROUTES.SETTINGS,
    Component: lazy(() => import("@pages/Settings")),
  },
  {
    path: PRIVATE_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
