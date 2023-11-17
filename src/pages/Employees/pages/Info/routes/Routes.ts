import { lazy } from "react";
import { ROUTES } from "./path";

const Routes = [
  {
    path: ROUTES.DETAILS,
    Component: lazy(() => import("../pages/Details")),
  },
  {
    path: ROUTES.EDIT,
    Component: lazy(() => import("../pages/Edit")),
  },
  {
    path: ROUTES.SESSION,
    Component: lazy(() => import("../pages/Session")),
  },
  {
    path: ROUTES.SETTINGS,
    Component: lazy(() => import("../pages/Settings")),
  },

  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@/pages/NotFound")),
  },
];

export default Routes;
