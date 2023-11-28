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

export const QueryProvider: React.FC<{
  children: React.ReactNode;
  defaultValue?: {
    limit?: number | undefined;
    page?: number | undefined;
    search?: string | undefined;
    filters?:
      | {
          [key: string]: string | boolean | undefined;
        }
      | undefined;
  };
}> = ({ children, defaultValue }) => {
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
      ...defaultValue,
      filters: {
        sort: "created_at",
        ...defaultValue?.filters,
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
