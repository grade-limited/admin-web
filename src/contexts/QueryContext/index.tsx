import React from "react";
import { IParams } from "./types";
import { usePaginate } from "@tam11a/react-use-hooks";

const defaultParams: IParams = {
	limit: 10,
	page: 1,
	search: "",
	getQueryParams: () => "",
	params: {
		limit: 10,
		page: 1,
		search: "",
		filters: {},
	},
	setFilterField: () => {},
	setLimit: () => {},
	setPage: () => {},
	setSearch: () => {},
	watch: () => undefined,
};

const QueryContext = React.createContext<IParams>(defaultParams);

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const {
		getQueryParams,
		limit,
		page,
		params,
		search,
		setFilterField,
		setLimit,
		setPage,
		setSearch,
		watch,
	} = usePaginate({
		defaultParams: {
			filters: {
				sort: "created_at",
			},
		},
	});

	return (
		<QueryContext.Provider
			value={{
				limit,
				page,
				search,
				getQueryParams,
				params,
				setFilterField,
				setLimit,
				setPage,
				setSearch,
				watch,
			}}
		>
			{children}
		</QueryContext.Provider>
	);
};

export default QueryContext;
