import { useGetBrandsById } from "@/queries/brands";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import Iconify from "@components/iconify";
import { Avatar, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import useQueryContext from "@/hooks/useQueryContext";
// import { useGetProducts } from "@/queries/products";
// import Column from "./components/Column";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const { data, isLoading } = useGetBrandsById(id);
  // const {
  //   getQueryParams,
  //   page,
  //   limit = 10,
  //   setPage,
  //   setLimit,
  // } = useQueryContext();

  // const { data: prodData, isLoading: isProdLoading } = useGetProducts({
  //   ...getQueryParams,
  //   brand_id: id,
  // });

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

            <p className="text-text-light text-xs mt-2">
              Created {moment(data?.created_at).calendar()}
            </p>

            <p className="text-text-light text-xs">
              Last Updated {moment(data?.updated_at).calendar()}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl py-3 ">
          <div className="flex flex-col gap-3 border border-slate-200 p-3 rounded-3xl">
            <p className="text-lg font-bold flex flex-row items-center h-full max-h-[200px]">
              Description
            </p>
            {!!data?.description ? (
              <p className="text-text-light text-xs font-bold break-words">
                {data?.description}
              </p>
            ) : (
              "No Description Added"
            )}
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-4 content-center gap-2 py-3">
          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <p>Gender</p>
            <p className="col-span-2">: {data?.gender}</p>
            <p>Phone</p>
            <p className="col-span-2">: {data?.phone}</p>
            <p>Email</p>
            <p className="col-span-2">: {data?.email}</p>
            <p>Date of Birth</p>
            <p className="col-span-2">: {moment(data?.dob).format("ll")}</p>
            <p>Address</p>
            <p className="col-span-2">: {data?.address}</p>
          </div>
          <div className="flex items-center col-span-2 justify-center border border-slate-200 p-3 rounded-3xl">
            No Badge
          </div>
        </div> */}
      </div>
    </Spin>
  );
};

export default Details;
