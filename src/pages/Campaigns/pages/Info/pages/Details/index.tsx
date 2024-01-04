import { useGetCampaignsById } from "@/queries/campaigns";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { Image, Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import useQueryContext from "@/hooks/useQueryContext";
// import { useGetProducts } from "@/queries/products";
// import Column from "./components/Column";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const { data, isLoading } = useGetCampaignsById(id);
  // const {
  //   getQueryParams,
  //   page,
  //   limit = 10,
  //   setPage,
  //   setLimit,
  // } = useQueryContext();

  // const { data: prodData, isLoading: isProdLoading } = useGetProducts({
  //   ...getQueryParams,
  //   campaign_id: id,
  // });

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-2xl">
        {data?.cover_url ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 my-3 rounded-3xl">
            <Image
              className="rounded-2xl w-full h-auto object-contain"
              src={previewAttachment(data?.cover_url)}
              alt={data?.name}
              {...stringAvatar(data?.name)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl">
          {data?.thumbnail_url ? (
            <Image
              className="rounded-2xl w-32 h-auto "
              src={previewAttachment(data?.thumbnail_url)}
              alt={data?.name}
              {...stringAvatar(data?.name)}
            />
          ) : (
            ""
          )}
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.name}
              <Link to={`/app/campaigns/i/${data?.id}/edit`}>
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
          {/* <div>
              <a href={data?.website_url} target="__blank">
                <IconButton>
                  <Iconify icon="ph:globe-light" className="text-2xl -mx-2" />
                </IconButton>
              </a>
              <a href={data?.linkedin_url} target="__blank">
                <IconButton>
                  <Iconify icon="circum:linkedin" className="text-2xl -mx-2" />
                </IconButton>
              </a>
              <a href={data?.facebook_url} target="__blank">
                <IconButton>
                  <Iconify
                    icon="ant-design:facebook-outlined"
                    className="text-2xl -mx-2"
                  />
                </IconButton>
              </a>
              <a href={data?.instagram_url} target="__blank">
                <IconButton>
                  <Iconify
                    icon="iconoir:instagram"
                    className="text-2xl -mx-2"
                  />
                </IconButton>
              </a>
            </div> */}
        </div>

        <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl my-3">
          <div className="col-span-3">
            <p className="flex flex-row items-center font-semibold text-base pb-3">
              Info
            </p>
          </div>
          <p>Id</p>
          <p className="col-span-2">: {data?.id}</p>
          <p>Name</p>
          <p className="col-span-2">: {data?.name}</p>
          <p>Campaign Type</p>
          <p className="col-span-2">: {data?.campaign_type}</p>
          <p>Campaign Link</p>
          <p className="col-span-2">: {data?.campaign_url}</p>
          <p>Amount</p>
          <p className="col-span-2">
            : {data?.amount}{" "}
            {data?.amount_type === "amount"
              ? "৳"
              : data?.amount_type === "percentage"
              ? "%"
              : "-"}
          </p>

          <p>Start Date</p>
          <p className="col-span-2">
            :{" "}
            {data?.start_date ? (
              <>{moment(data?.start_date).format("ll")}</>
            ) : (
              "-"
            )}
          </p>
          <p>End Date</p>
          <p className="col-span-2">
            :{" "}
            {data?.end_date ? <>{moment(data?.end_date).format("ll")}</> : "-"}
          </p>
        </div>
        <div className="mx-auto max-w-3xl flex flex-col border border-slate-200 rounded-2xl mt-3 p-3 ">
          <p className="text-lg font-bold flex flex-row items-center h-full max-h-[200px] pb-3">
            Description
          </p>
          {!!data?.description ? (
            <p
              className="pl-6"
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
            ></p>
          ) : (
            "No Description Added"
          )}
        </div>
      </div>
    </Spin>
  );
};

export default Details;
