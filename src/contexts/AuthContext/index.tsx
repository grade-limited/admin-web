import React from "react";
import { message } from "@components/antd/message";
import { useNavigate } from "react-router-dom";
import { IAuthContext, IToken, IUser } from "./types";
import { useGetValidation, useLogin, useLogout } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import { updateInstanceAuthorization } from "@/services";
import useAreYouSure from "@/hooks/useAreYouSure";
import { Typography } from "@mui/material";

const defaultValues: IAuthContext = {
	isLoggedIn: false,
	token: null,
	setToken: () => {},
	user: {
		id: 0,
		first_name: "",
		last_name: "",
		username: "",
		gender: "others",
		display_picture: "",
		email: "",
		phone: "",
		dob: "",
		hired_date: "",
		work_hour: "",
		salary: 0,
		bank: "",
		address: "",
		max_session: 0,
		is_active: true,
		verified_at: "",
		role_id: undefined,
		created_at: "",
		updated_at: "",
		deleted_at: "",
		role: undefined,
	},
	isLoading: false,
	login: () => {},
	isLoginLoading: false,
	logout: () => {},
	isLogoutLoading: false,
};

const AuthContext = React.createContext<IAuthContext>(defaultValues);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const [token, setToken] = React.useState<IToken>(
		sessionStorage.getItem("token") || localStorage.getItem("token")
	);

	const [user, setUser] = React.useState<IUser>(defaultValues.user);

	const { mutateAsync: mutateLogin, isLoading: isLoginLoading } = useLogin();
	const { mutateAsync: mutateLogout, isLoading: isLogoutLoading } = useLogout();
	const {
		data: validationData,
		isLoading: isValidationLoading,
		isError: isValidationError,
		error,
	} = useGetValidation(token);

	React.useEffect(() => {
		if (!validationData) return;
		setUser(validationData?.data);
	}, [validationData]);

	React.useEffect(() => {
		let status = error?.request?.status;
		if (!isValidationError || status !== 401) return;

		messageApi.open({
			type: "loading",
			content: "Signing out..",
			duration: 0,
		});
		setTimeout(() => {
			messageApi.destroy();
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			setToken(null);
			updateInstanceAuthorization();
			messageApi.success("Logged out! Please sign in again");
		}, 1000);
	}, [isValidationError]);

	const handleToken = (tkn: IToken, remember: boolean | false) => {
		if (!tkn) return;
		if (remember) localStorage.setItem("token", tkn);
		else sessionStorage.setItem("token", tkn);
		setToken(tkn);
	};

	const login = async (
		phone: string,
		password: string,
		remember: boolean = false
	) => {
		messageApi.open({
			type: "loading",
			content: "Logging in..",
			duration: 0,
		});

		const res = await handleResponse(() => mutateLogin({ phone, password }));
		messageApi.destroy();
		console.log(res);
		if (res.status) {
			handleToken(res.data?.jwt, remember); // remove res.data when the login api is updated permanently
			updateInstanceAuthorization();
			messageApi.success("Welcome!!");
		} else {
			messageApi.error(res.message || "Something went wrong!");
			if (res.data?.isVerified === false) {
				sessionStorage.setItem(`otp_n`, res.data?.phone);
				navigate(`/otp`);
			}
		}
	};

	const logout = async () => {
		messageApi.open({
			type: "loading",
			content: "Logging out..",
			duration: 0,
		});
		const res = await handleResponse(mutateLogout);
		messageApi.destroy();
		if (res.status) {
			localStorage.clear();
			sessionStorage.clear();
			document.cookie = "";
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
			setToken(null);
			updateInstanceAuthorization();
			messageApi.success("Logged out successfully");
		} else {
			messageApi.error(res.message || res.data);
		}
	};
	const AreYouSure = useAreYouSure({ color: "error", title: "Logout" });

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				setToken: handleToken,
				user,
				isLoading: isValidationLoading,
				login,
				isLoginLoading,
				logout: async () =>
					AreYouSure.open(
						() => logout(),
						<>
							<Typography variant="body1">You want to logout?</Typography>
						</>
					),
				isLogoutLoading,
			}}
		>
			{children}
			{contextHolder}
			{AreYouSure.contextHolder}
		</AuthContext.Provider>
	);
};

export default AuthContext;
