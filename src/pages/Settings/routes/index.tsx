import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { settingsRoutes } from "./settingsRoutes";
import NProgressSuspense from "@components/NProgressSuspense";

const SettingsRoutes: React.FC = () => {
  return (
    <Routes>
      {settingsRoutes?.map?.(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<NProgressSuspense />}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default SettingsRoutes;
