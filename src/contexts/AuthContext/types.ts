export type IToken = string | null;

export type IUser = {
	// userId: number;
	// name: string;
	// //   accessRights: string[];
	// username: string;

	id: number;
	first_name: string;
	last_name: string;
	username: string;
	gender: "male" | "female" | "others";
	display_picture?: string;
	email?: string;
	phone: string;
	dob: string;
	hired_date: string;
	work_hour: string;
	salary: number;
	bank?: string;
	address?: string;
	max_session: number;
	is_active: boolean;
	verified_at: string;
	role_id?: number;
	created_at: string;
	updated_at: string;
	deleted_at: string;
	role?: {
		id: number;
		name: string;
	};
};

export type IAuthContext = {
	isLoggedIn: boolean;
	token: IToken;
	setToken: (token: IToken, remember: boolean | false) => void;
	user: IUser;
	isLoading: boolean | false;
	login: (phone: string, password: string, remember: boolean | false) => void;
	isLoginLoading: boolean;
	logout: () => void;
	isLogoutLoading: boolean;
};
