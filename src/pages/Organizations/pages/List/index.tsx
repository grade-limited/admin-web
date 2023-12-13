import React from "react";
import useQueryContext from "@/hooks/useQueryContext";
import { DataGrid } from "@mui/x-data-grid";
import Column from "./components/Column";
import { useNavigate } from "react-router-dom";
import { useGetOrganizations } from "@/queries/organizations";

const List: React.FC = () => {
  const navigate = useNavigate();
  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();
  const { data, isLoading } = useGetOrganizations({ ...getQueryParams() });

  return (
    <div className="p-3 w-full h-full ">
      <DataGrid
        columns={Column()}
        rows={data?.data || []}
        loading={isLoading}
        rowCount={data?.total || 0}
        paginationModel={{
          page,
          pageSize: limit,
        }}
        onPaginationModelChange={(params) => {
          if (params.page !== page) setPage(params.page);
          if (params.pageSize !== limit) setLimit(params.pageSize);
        }}
        autoHeight
        density="compact"
        pageSizeOptions={[10, 25, 50, 100, 200]}
        paginationMode={"server"}
        onRowDoubleClick={(row) => navigate(`/app/organizations/i/${row.id}`)}
        disableRowSelectionOnClick
        disableColumnFilter
      />
    </div>
  );
};

export default List;
