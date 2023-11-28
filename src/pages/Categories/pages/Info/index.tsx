import React from "react";
import Navigator from "./Navigator";
import ServiceRoutes from "./routes";
import TrashAlert from "./TrashAlert";

const Item: React.FC = () => {
  return (
    <>
      <Navigator />
      <TrashAlert />
      <ServiceRoutes />
    </>
  );
};

export default Item;
