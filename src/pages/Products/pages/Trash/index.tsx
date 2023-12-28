import React from "react";
import useQueryContext from "@/hooks/useQueryContext";
import { DataGrid } from "@mui/x-data-grid";
import Column from "./components/Column";
import { useNavigate } from "react-router-dom";
import { useGetProducts } from "@/queries/products";

const List: React.FC = () => {
  const navigate = useNavigate();

  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();
  const { data, isLoading } = useGetProducts({
    ...getQueryParams(),
    trash: true,
  });

  return (
    <div className="p-3 w-full h-full">
      <DataGrid
        columns={Column()}
        rows={data?.data || []}
        autoHeight
        density="compact"
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
        onRowDoubleClick={(row) => navigate(`/app/products/i/${row.id}`)}
        disableRowSelectionOnClick
        disableColumnFilter
      />
    </div>
  );
};

export default List;
