import { useGetOrganizationsById } from "@/queries/organizations";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
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
  const { data, isLoading } = useGetOrganizationsById(id);
  // const {
  //   getQueryParams,
  //   page,
  //   limit = 10,
  //   setPage,
  //   setLimit,
  // } = useQueryContext();

  // const { data: prodData, isLoading: isProdLoading } = useGetProducts({
  //   ...getQueryParams,
  //   organization_id: id,
  // });

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl">
          <div className="p-4">
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.name}
              <Link to={`/app/organizations/i/${data?.id}/edit`}>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 content-center gap-2 py-3">
          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row items-center font-semibold text-base pb-3">
                Info
              </p>
            </div>
            <p>Id</p>
            <p className="col-span-2">: {data?.id}</p>
            <p>Name</p>
            <p className="col-span-2">: {data?.name}</p>
            <p>Number</p>
            <p className="col-span-2">: {data?.contact_number}</p>
            <p>Email</p>
            <p className="col-span-2">: {data?.contact_email}</p>
            <p>Type</p>
            <p className="col-span-2">: {data?.business_type}</p>
            <p>Subtype</p>
            <p className="col-span-2">: {data?.business_subtype}</p>
          </div>

          <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
            <div className="col-span-3">
              <p className="flex flex-row justify-e items-center font-semibold text-base pb-3">
                Social Info
              </p>
            </div>
            <p>Website</p>
            <p className="col-span-2">: {data?.website_url}</p>
            <p>LinkedIn</p>
            <p className="col-span-2">: {data?.linkedin_url}</p>

            <p>Facebook</p>
            <p className="col-span-2">: {data?.facebook_url} </p>

            <p>Instagram</p>
            <p className="col-span-2">: {data?.instagram_url}</p>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Details;
