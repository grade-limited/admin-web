import React from "react";
import Navigator from "./Navigator";
import ServiceRoutes from "./routes";

const Item: React.FC = () => {
	return (
		<>
			<Navigator />
			<ServiceRoutes />
		</>
	);
};

export default Item;
