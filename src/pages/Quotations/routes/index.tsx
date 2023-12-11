import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NestedRoutes from "./Routes";
import NProgressSuspense from "@components/NProgressSuspense";
import Navigator from "../components/Navigator";

const ServiceRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        {NestedRoutes?.map?.(({ path, navigator, only_calender }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<NProgressSuspense />}>
                {navigator ? <Navigator hideSearch={only_calender} /> : <></>}
              </Suspense>
            }
          />
        ))}
      </Routes>
      <Routes>
        {NestedRoutes?.map?.(({ path, Component }) => (
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
    </>
  );
};

export default ServiceRoutes;
