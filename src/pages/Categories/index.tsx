import React from "react";
import ServiceRoutes from "./routes";
import { QueryProvider } from "@/contexts/QueryContext";

const Categories: React.FC = () => {
  return (
    <>
      <QueryProvider defaultValue={{ filters: { only_parent: true } }}>
        <ServiceRoutes />
      </QueryProvider>
    </>
  );
};

export default Categories;
