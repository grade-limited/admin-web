export type IOnOk = (() => Promise<any>) | (() => any);

export type IAreYouSure = {
	open: (onOk: IOnOk, content: React.ReactNode | string, title?: string) => any;
	close: () => void;
	contextHolder: React.ReactNode;
};

export type AreYouSureProps = {
	title?: string | undefined;
	color?:
		| "primary"
		| "error"
		| "inherit"
		| "secondary"
		| "warning"
		| "info"
		| "success";
	okText?: string;
	cancelText?: string;
	hideCancel?: boolean;
};
