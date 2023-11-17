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
    path: PRIVATE_ROUTES.SUBJECTS,
    Component: lazy(() => import("@pages/Subjects")),
  },
  {
    path: PRIVATE_ROUTES.CHAPTERS,
    Component: lazy(() => import("@pages/Chapters")),
  },
  {
    path: PRIVATE_ROUTES.TOPICS,
    Component: lazy(() => import("@pages/Topics")),
  },
  {
    path: PRIVATE_ROUTES.QSNBANK,
    Component: lazy(() => import("@pages/QsnBank")),
  },
  {
    path: PRIVATE_ROUTES.EXAMS,
    Component: lazy(() => import("@pages/Exams")),
  },
  {
    path: PRIVATE_ROUTES.QUESTIONS,
    Component: lazy(() => import("@pages/Questions")),
  },
  {
    path: PRIVATE_ROUTES.EMPLOYEES,
    Component: lazy(() => import("@pages/Employees")),
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
