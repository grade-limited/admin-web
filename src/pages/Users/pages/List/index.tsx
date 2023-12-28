import useQueryContext from "@/hooks/useQueryContext";
import { useGetUsers } from "@/queries/users";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import UserColumn from "./components/userColumn";
import { useNavigate } from "react-router-dom";

const List: React.FC = () => {
  const navigate = useNavigate();
  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();
  const { data, isLoading } = useGetUsers({ ...getQueryParams() });

  return (
    <div className="p-3 w-full h-full max-h-[500px]">
      <DataGrid
        columns={UserColumn()}
        rows={data?.data?.data || []}
        loading={isLoading}
        rowCount={data?.data?.total || 0}
        paginationModel={{
          page,
          pageSize: limit,
        }}
        onPaginationModelChange={(params) => {
          if (params.page !== page) setPage(params.page);
          if (params.pageSize !== limit) setLimit(params.pageSize);
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode={"server"}
        onRowDoubleClick={(row) => navigate(`/app/users/i/${row.id}`)}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default List;
