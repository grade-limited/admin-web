import { useGetUsersStatsReport } from "@/queries/reports";
import { Card, Spin, Tag } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetEmployeeship } from "@/queries/employeeship";
import useQueryContext from "@/hooks/useQueryContext";
import { DataGrid } from "@mui/x-data-grid";
import Column from "./components/Column";

const Details: React.FC = () => {
  const { watch } = useQueryContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();
  const { data, isLoading } = useGetEmployeeship({
    ...getQueryParams(),
    organization_id: id,
  });

  //DUMMY DATA

  const { data: stats, isLoading: statsLoading } = useGetUsersStatsReport({
    start_date: moment(watch("range")?.[0]).startOf("day").toISOString(),
    end_date: moment(watch("range")?.[1]).endOf("day").toISOString(),
  });

  return (
    <div className="p-3">
      <Spin spinning={statsLoading}>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-6">
          <Card
            size="small"
            className="shadow-md bg-[#B3ECF4]"
            bordered={false}
          >
            <h1 className="font-semibold text-text-light">Total Brands</h1>

            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-xl text-text-dark">
                {stats?.total_users || 0}
              </span>
              <Tag
                color="#fff"
                className="text-text-light font-semibold rounded-xl"
              >
                +2.5%
              </Tag>
            </div>
          </Card>
          <Card
            size="small"
            className="shadow-md bg-[#FEE0A0]"
            bordered={false}
          >
            <h1 className="font-semibold text-text-light">New Brands</h1>

            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-xl text-text-dark">
                {stats?.new_users || 0}
              </span>
              <Tag
                color="#fff"
                className="text-text-light font-semibold rounded-xl"
              >
                +2.5%
              </Tag>
            </div>
          </Card>
          <Card
            size="small"
            className="shadow-md bg-[#ffd8be]"
            bordered={false}
          >
            <h1 className="font-semibold text-text-light">
              Suspended Accounts
            </h1>

            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-xl text-text-dark">
                {stats?.skipped_exams || 0}
              </span>
              <Tag
                color="#fff"
                className="text-text-light font-semibold rounded-xl"
              >
                +2.5%
              </Tag>
            </div>
          </Card>
          <Card
            size="small"
            className="shadow-md bg-[#ffbebe]"
            bordered={false}
          >
            <h1 className="font-semibold text-text-light">Deleted Accounts</h1>

            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-xl text-text-dark">
                {stats?.deleted_users || 0}
              </span>
              <Tag
                color="#fff"
                className="text-text-light font-semibold rounded-xl"
              >
                +2.5%
              </Tag>
            </div>
          </Card>
        </div>
      </Spin>
      <div className="p-3 w-full h-full max-h-[550px]">
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
          pageSizeOptions={[10, 25, 50, 100, 200]}
          paginationMode={"server"}
          onRowDoubleClick={(row) => navigate(`/app/employeeship/i/${row.id}`)}
          disableRowSelectionOnClick
          disableColumnFilter
        />
      </div>
    </div>
  );
};

export default Details;
