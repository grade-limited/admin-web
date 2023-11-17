import useAuth from "@/hooks/useAuth";
import { useToggle } from "@tam11a/react-use-hooks";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// const AppHeader = lazy(() => import("./Header"));
const AppDrawer = React.lazy(() => import("./Drawer"));

const AppLayout: React.FC = () => {
	const location = useLocation();

	const {
		state: open,
		toggleState: toggleDrawer,
		// setState
	} = useToggle(false);

	const { isLoggedIn } = useAuth();

	// React.useEffect(() => {
	// 	setState(false);
	// }, [location.pathname]);

	return isLoggedIn ? (
		<>
			{/* <AppHeader /> */}
			<div className="flex flex-row">
				<AppDrawer
					open={open}
					toggleDrawer={toggleDrawer}
				/>
				<div className="w-full h-screen max-h-screen overflow-auto p-2 relative">
					<Outlet />
				</div>
			</div>
		</>
	) : (
		<Navigate to={`/?to=${location.pathname}`} />
	);
};

export default AppLayout;
