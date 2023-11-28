export interface IParams {
  params: {
    limit: number | undefined;
    page: number | undefined;
    search: string | undefined;
    filters:
      | {
          [key: string]: string;
        }
      | undefined;
  };
  search: string | undefined;
  setSearch: (text: any) => void;
  page: number;
  setPage: (newPage: number) => void;
  limit: number | undefined;
  setLimit: (newLimit: number) => void;
  watch: (key: any) => string | undefined | any;
  setFilterField: (key: any, value: any) => void;
  getQueryParams: () => any;
}
