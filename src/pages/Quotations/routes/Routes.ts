import { lazy } from "react";
import { ROUTES } from "./path";

const Routes = [
  {
    path: ROUTES.OVERVIEW,
    Component: lazy(() => import("../pages/Overview")),
    navigator: true,
    only_calender: true,
  },
  {
    path: ROUTES.LIST,
    Component: lazy(() => import("../pages/List")),
    navigator: true,
  },
  {
    path: ROUTES.TRASH,
    Component: lazy(() => import("../pages/Trash")),
    navigator: true,
  },
  // {
  // 	path: ROUTES.CREATE,
  // 	Component: lazy(() => import("../pages/Create")),
  // },
  {
    path: ROUTES.INFO,
    Component: lazy(() => import("../pages/Info")),
  },
  {
    path: ROUTES.NOTFOUND,
    Component: lazy(() => import("@/pages/NotFound")),
  },
];

export default Routes;
