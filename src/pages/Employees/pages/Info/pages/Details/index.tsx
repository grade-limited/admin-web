import { useGetEmployeesById } from "@/queries/employees";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
import { Image, Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeesById(id);
  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl">
          {data?.display_picture ? (
            <Image
              className="rounded-2xl w-32 h-32 aspect-square"
              src={previewAttachment(data?.display_picture)}
              alt={[data?.first_name, data?.last_name].join(" ")}
              {...stringAvatar([data?.first_name, data?.last_name].join(" "))}
            />
          ) : (
            ""
          )}
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {[data?.first_name, data?.last_name].join(" ")}{" "}
              <Link to={`/app/employees/i/${data?.id}/edit`}>
                <IconButton size="small">
                  <Iconify icon="fluent:edit-12-regular" />
                </IconButton>
              </Link>
            </p>
            <p className="text-text-light font-semibold">
              @{data?.username || "-"}
            </p>

            <p className="text-text-light text-xs mt-2">
              Created {moment(data?.created_at).calendar()}
            </p>
            <p className="text-text-light text-xs">
              Last Updated {moment(data?.updated_at).calendar()}
            </p>
          </div>
        </div>

        <div className="content-center gap-2 py-3">
          <p className="font-medium mb-2 px-1">Personal Information</p>
          <div className="grid grid-cols-3 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-lg">
            <p className="text-text-light font-semibold">Gender</p>
            <p className="col-span-2">: {data?.gender}</p>
            <p className="text-text-light font-semibold">Phone</p>
            <p className="col-span-2">: {data?.phone}</p>
            <p className="text-text-light font-semibold">Email</p>
            <p className="col-span-2">: {data?.email}</p>
            <p className="text-text-light font-semibold"> Date of Birth</p>
            <p className="col-span-2">: {moment(data?.dob).format("ll")}</p>
            <p className="text-text-light font-semibold">Address</p>
            <p className="col-span-2">: {data?.address}</p>
          </div>
        </div>
        {data?.role ? (
          <>
            <p className="font-medium mb-2 px-1">Role Information</p>
            <div className="border border-slate-200 p-5 break-all rounded-lg">
              <Link
                to={`/app/roles/i/${data?.role?.id}`}
                className="float-right"
              >
                <IconButton size="small">
                  <Iconify icon="majesticons:open-line" />
                </IconButton>
              </Link>
              <div className="grid grid-cols-3  justify-items-start gap-1 ">
                <p className="text-text-light font-semibold">Role id</p>
                <p className="col-span-2">: {data?.role?.id || "-"}</p>
                <p className="text-text-light font-semibold">Role Name</p>
                <p className="col-span-2">: {data?.role?.name || "-"}</p>
                <p className="text-text-light font-semibold">Role Prefix</p>
                <p className="col-span-2">: {data?.role?.prefix || "-"}</p>
                <p className="text-text-light font-semibold">
                  Role Description
                </p>
                <p className="col-span-2">: {data?.role?.description || "-"}</p>
                <p className="text-text-light font-semibold">
                  Total Permissions
                </p>
                <p className="col-span-2">
                  : {data?.role?.total_permission || "-"}
                </p>
              </div>
            </div>
          </>
        ) : (
          " "
        )}
      </div>
    </Spin>
  );
};

export default Details;
