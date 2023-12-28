import React from "react";
import useQueryContext from "@/hooks/useQueryContext";
import { DataGrid } from "@mui/x-data-grid";
import Column from "./components/Column";
import { useNavigate } from "react-router-dom";
import { useGetQuotations } from "@/queries/quotations";

const List: React.FC = () => {
  const navigate = useNavigate();
  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();
  const { data, isLoading } = useGetQuotations({ ...getQueryParams() });

  return (
    <div className="p-3 w-full h-full ">
      <DataGrid
        columns={Column()}
        rows={data?.data || []}
        loading={isLoading}
        rowCount={data?.total || 0}
        autoHeight
        density="compact"
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
        onRowDoubleClick={(row) => navigate(`/app/quotations/i/${row.id}`)}
        disableRowSelectionOnClick
        disableColumnFilter
      />
    </div>
  );
};

export default List;
