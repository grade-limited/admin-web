import { lazy } from "react";
import { SETTINGS_ROUTES } from "./paths";

export const settingsRoutes = [
  {
    path: SETTINGS_ROUTES.PERSONAL,
    Component: lazy(() => import("../pages/Personal")),
  },
  {
    path: SETTINGS_ROUTES.SECURITY,
    Component: lazy(() => import("../pages/Security")),
  },
  {
    path: SETTINGS_ROUTES.SESSION,
    Component: lazy(() => import("../pages/Session")),
  },
  {
    path: SETTINGS_ROUTES.NOTFOUND,
    Component: lazy(() => import("@pages/NotFound")),
  },
];
