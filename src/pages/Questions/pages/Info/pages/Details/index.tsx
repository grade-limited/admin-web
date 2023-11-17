import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetQuestionsById } from "@/queries/questions";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetQuestionsById(id);
  console.log(data);
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
              {data?.question}
              <Link to={`/app/topics/i/${data?.id}/edit`}>
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
          {!!data?.answers?.length && (
            <>
              <p className="font-medium mb-2 px-1">Options</p>
              <div className="border gap-1 border-slate-200 p-5 break-all rounded-lg">
                {data?.answers?.map((ans: any) => (
                  <div>&bull; {ans.title}</div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="content-center gap-2 py-3">
          {!!data?.linked_exams?.length && (
            <>
              <p className="font-medium mb-2 px-1">Linked Exam</p>
              <div className="grid grid-cols-3 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-lg">
                <p className="text-text-light font-semibold">Name</p>
                <p className="col-span-2">
                  :{" "}
                  <Link to={`/app/exams/i/${data?.linked_exams[0].id}`}>
                    <span className="underline">
                      {data?.linked_exams
                        ?.flatMap((y: any) =>
                          [y.question_bank.name, y.name].join(" ")
                        )
                        .join(", ")}
                    </span>
                  </Link>
                </p>
                <p className="text-text-light font-semibold">Attendee Type</p>
                <p className="col-span-2">
                  : {data?.linked_exams[0].attendee_type}
                </p>
                <p className="text-text-light font-semibold">Exam Duration</p>
                <p className="col-span-2">
                  :{" "}
                  {data?.linked_exams[0]?.duration ? (
                    <>{data?.linked_exams[0]?.duration}m</>
                  ) : (
                    "Unlimited"
                  )}
                </p>
                <p className="text-text-light font-semibold">Live Date</p>
                <p className="col-span-2">
                  :{" "}
                  {data?.linked_exams[0]?.live_datetime
                    ? moment(data?.linked_exams[0]?.live_datetime).calendar()
                    : "-"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default Details;
