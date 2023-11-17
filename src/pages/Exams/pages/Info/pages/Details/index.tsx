import { useGetExamsById } from "@/queries/exams";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetExamsById(id);
  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center border border-slate-200 p-3 rounded-3xl px-6">
          {/* <Avatar
            className="rounded-2xl w-32 h-32 aspect-square"
            variant="square"
            src={previewAttachment(data?.cover_picture)}
            alt={data?.name}
            {...stringAvatar(data?.name)}
          /> */}
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.name}
              <Link to={`/app/exams/i/${data?.id}/edit`}>
                <IconButton size="small">
                  <Iconify icon="fluent:edit-12-regular" />
                </IconButton>
              </Link>
            </p>
            <p className="text-text-light font-semibold">
              {data?.description || ""}
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
          <p className="font-medium mb-2 px-1">Exam Information</p>
          <div className="grid grid-cols-3 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-lg">
            <p className="text-text-light font-semibold">Name</p>
            <p className="col-span-2">: {data?.name}</p>
            <p className="text-text-light font-semibold">Description</p>
            <p className="col-span-2 whitespace-pre-wrap">
              : {data?.description}
            </p>
            <p className="text-text-light font-semibold">Duration</p>
            <p className="col-span-2">: {data?.duration || "-"}</p>
            <p className="text-text-light font-semibold">Negative Marking</p>
            <p className="col-span-2">: {data?.negative_mark || "-"}</p>
            <p className="text-text-light font-semibold">Question Bank</p>
            <p className="col-span-2">: {data?.question_bank?.name || "-"}</p>
            <p className="text-text-light font-semibold">Exam Type</p>
            <p className="col-span-2">: {data?.type || "-"}</p>{" "}
            <p className="text-text-light font-semibold">Attendance Type</p>
            <p className="col-span-2">: {data?.attendee_type || "-"}</p>
            <p className="text-text-light font-semibold">Archivable?</p>
            <p className="col-span-2">
              : {data?.is_archivable ? "Yes" : "No" || "-"}
            </p>
            <p className="text-text-light font-semibold">Live Exam Date</p>
            <p className="col-span-2">
              : {moment(data?.live_datetime || "-").format("lll")}
            </p>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Details;
