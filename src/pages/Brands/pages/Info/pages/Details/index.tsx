import { useGetBrandsById } from "@/queries/brands";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import Iconify from "@components/iconify";
import { Avatar, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useQueryContext from "@/hooks/useQueryContext";
import { useGetProducts } from "@/queries/products";
import Column from "./components/Column";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBrandsById(id);
  const {
    getQueryParams,
    page,
    limit = 10,
    setPage,
    setLimit,
  } = useQueryContext();

  const { data: prodData, isLoading: isProdLoading } = useGetProducts({
    ...getQueryParams,
    brand_id: id,
  });
  console.log(id);

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl">
          <Avatar
            className="rounded-2xl w-32 h-32 aspect-square"
            variant="square"
            src={previewAttachment(data?.display_picture)}
            alt={[data?.first_name, data?.last_name].join(" ")}
            {...stringAvatar([data?.first_name, data?.last_name].join(" "))}
          />
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.name}
              <Link to={`/app/brands/i/${data?.id}/edit`}>
                <IconButton size="small">
                  <Iconify icon="fluent:edit-12-regular" />
                </IconButton>
              </Link>
            </p>
            {!!data?.description ? (
              <p className="text-text-light text-xs mt-2 font-bold">
                {data?.description}
              </p>
            ) : (
              ""
            )}
            <p className="text-text-light text-xs mt-2">
              Created {moment(data?.created_at).calendar()}
            </p>

            <p className="text-text-light text-xs">
              Last Updated {moment(data?.updated_at).calendar()}
            </p>
          </div>
        </div>
      </div>
      <div className="py-3 sm:p-3 w-full h-full max-h-[500px]">
        <DataGrid
          columns={Column()}
          rows={prodData?.data || []}
          loading={isProdLoading}
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
          onRowDoubleClick={(row) => navigate(`/app/products/i/${row.id}`)}
          disableRowSelectionOnClick
          disableColumnFilter
        />
      </div>
    </Spin>
  );
};

export default Details;
