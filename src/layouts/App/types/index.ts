export type IDrawerButton = {
	name: string;
	icon: React.ReactNode;
	to?: string;
	function?: () => void;
	disabled?: boolean | false;
	hide?: boolean | false;
};

export type IDrawerData = {
	title: string;
	sublist: IDrawerButton[];
};
