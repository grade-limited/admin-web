import React from "react";
import { Button as AntButton, Spin, Popconfirm } from "antd";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { useDeleteCampaign, useGetCampaignsById } from "@/queries/campaigns";

const Security: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetCampaignsById(id);

  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteCampaign();

  const onDelete = async (permanent: any = null, restore: any = null) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Campaign Permanently.."
        : restore
        ? "Restoring Campaign.."
        : "Deleting Campaign..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      Delete({
        id,
        params: {
          permanent,
          restore,
        },
      })
    );

    message.destroy();

    if (res.status) {
      message.success(res.message);
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  return (
    <Spin spinning={isLoading}>
      <div className="container max-w-xl mx-auto">
        <p className="py-2 text-xl font-semibold text-red-500">Danger Zone</p>
        <div className="grid grid-cols-3 border border-primary-100 p-3 rounded-md gap-4 ">
          {data?.deleted_at ? (
            <>
              <div className="col-span-2">
                <p className=" text-md font-semibold">Restore Campaign</p>
                <p className="text-xs text-text-light">
                  Restoring a campaign involves reinstating their previously
                  deleted or suspended account, and allowing them to regain
                  access and functionality."
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Restore Campaign?"
                  description="Are you sure to restore the campaign?"
                  onConfirm={() => onDelete(null, true)}
                  okButtonProps={{
                    type: "primary",
                    style: {
                      backgroundColor: "#EF4444",
                      borderColor: "#EF4444",
                    },
                    loading: isDeleteLoading,
                  }}
                  cancelButtonProps={{
                    type: "dashed",
                  }}
                >
                  <AntButton
                    className="float-right"
                    type="dashed"
                    // disabled={isSubmitting}
                  >
                    Restore
                  </AntButton>
                </Popconfirm>
              </div>
            </>
          ) : (
            <>
              <div className="col-span-2">
                <p className=" text-md font-semibold">Delete Campaign</p>
                <p className="text-xs text-text-light">
                  Deleting a campaign involves temporarily removing their
                  account and associated data.
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Delete Campaign?"
                  description="Are you sure to delete this campaign?"
                  onConfirm={() => onDelete()}
                  okButtonProps={{
                    type: "primary",
                    style: {
                      backgroundColor: "#EF4444",
                      borderColor: "#EF4444",
                    },
                    loading: isDeleteLoading,
                  }}
                  cancelButtonProps={{
                    type: "dashed",
                  }}
                >
                  <AntButton
                    className="float-right text-red-500 border-red-500"
                    type="dashed"
                    // disabled={isSubmitting}
                  >
                    Delete
                  </AntButton>
                </Popconfirm>
              </div>
            </>
          )}

          <div className="col-span-2">
            <p className=" text-md font-semibold">Permanently Delete</p>
            <p className="text-xs text-text-light">
              Deleting a campaign involves permanently removing their account
              and associated data. You will not be able to recover this
              campaign.
            </p>
          </div>
          <div>
            <Popconfirm
              title="Delete Campaign Permanently?"
              description="Are you sure to delete permanently?"
              onConfirm={() => onDelete(true)}
              okButtonProps={{
                type: "primary",
                style: {
                  backgroundColor: "#EF4444",
                  borderColor: "#EF4444",
                },
                loading: isDeleteLoading,
              }}
              cancelButtonProps={{
                type: "dashed",
              }}
            >
              <AntButton
                className="float-right text-red-500 border-red-500"
                type="dashed"
                // disabled={isSubmitting}
              >
                Delete
              </AntButton>
            </Popconfirm>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Security;
