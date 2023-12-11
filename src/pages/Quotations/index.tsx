import React from "react";
import ServiceRoutes from "./routes";
import { QueryProvider } from "@/contexts/QueryContext";

const Quotations: React.FC = () => {
  return (
    <>
      <QueryProvider>
        <ServiceRoutes />
      </QueryProvider>
    </>
  );
};

export default Quotations;
