import React from "react";
import useQueryContext from "@/hooks/useQueryContext";
import { DataGrid } from "@mui/x-data-grid";
import Column from "./components/Column";
import { useNavigate } from "react-router-dom";
import { useGetExams } from "@/queries/exams";

const List: React.FC = () => {
  const navigate = useNavigate();

  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();
  const { data, isLoading } = useGetExams({
    ...getQueryParams(),
    trash: true,
  });

  return (
    <div className="p-3 w-full h-full max-h-[500px]">
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
          setPage(params.page);
          setLimit(params.pageSize);
        }}
        pageSizeOptions={[10, 25, 50, 100, 200]}
        paginationMode={"server"}
        onRowDoubleClick={(row) => navigate(`/app/exams/i/${row.id}`)}
        disableRowSelectionOnClick
        disableColumnFilter
      />
    </div>
  );
};

export default List;
