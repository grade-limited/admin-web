import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import Iconify from "@components/iconify";
import { IconButton } from "@mui/material";
import { Image, Spin } from "antd";
import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";

import { useGetCategoriesById } from "@/queries/categories";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCategoriesById(id);

  return (
    <Spin spinning={isLoading}>
      <div className="mx-auto max-w-3xl">
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
              <IconButton
                size="small"
                disabled={data?.deleted_at}
                component={Link}
                to={`/app/categories/i/${data?.id}/edit`}
              >
                <Iconify icon="fluent:edit-12-regular" />
              </IconButton>
            </p>

            <p className="text-text-light text-xs mt-2">
              Created {moment(data?.created_at).calendar()}
            </p>

            <p className="text-text-light text-xs">
              Last Updated {moment(data?.updated_at).calendar()}
            </p>
          </div>
        </div>
        {data?.parent ? (
          <div className="grid grid-cols-1 md:grid-cols-4 content-center gap-2 py-3">
            <div className="grid grid-cols-3 col-span-2 border justify-items-start gap-1 border-slate-200 p-5 break-all rounded-3xl">
              <div className="col-span-3">
                <p className="flex flex-row items-center font-semibold text-base pb-3">
                  Parent Category Info
                  <Link to={`/app/categories/i/${data?.parent_id}`}>
                    <IconButton size="small">
                      <Iconify icon="ph:arrow-square-out-bold" />
                    </IconButton>
                  </Link>
                </p>
              </div>
              <p>Id</p>
              <p className="col-span-2">: {data?.parent?.id}</p>
              <p>Name</p>
              <p className="col-span-2">: {data?.parent?.name}</p>
              <p>Created At</p>
              <p className="col-span-2">
                {data?.parent
                  ? `: ${moment(data?.parent?.created_at).format("lll")}`
                  : ": "}
              </p>
              <p>Updated At</p>
              <p className="col-span-2">
                {data?.parent
                  ? `: ${moment(data?.parent?.updated_at).format("lll")}`
                  : ":"}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        {!!data?.description ? (
          <div className="mx-auto max-w-3xl flex flex-col border border-slate-200 rounded-2xl mt-3 p-3 ">
            <p className="text-lg font-bold flex flex-row items-center h-full max-h-[200px] pb-3">
              Description
            </p>
            <p
              className=""
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
            ></p>
          </div>
        ) : (
          "No Description Added"
        )}
      </div>
    </Spin>
  );
};

export default Details;
