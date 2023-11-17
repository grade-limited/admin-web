import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";

// const WebsiteHeader = lazy(() => import("./Header"));
// const WebsiteFooter = lazy(() => import("./Footer"));

const WebsiteLayout: React.FC = () => {
	let [searchParams] = useSearchParams();
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? (
		<Navigate to={searchParams.get("to") || "/app"} />
	) : (
		<>
			{/* <WebsiteHeader /> */}
			<Outlet />
			{/* <WebsiteFooter /> */}
		</>
	);
};

export default WebsiteLayout;
