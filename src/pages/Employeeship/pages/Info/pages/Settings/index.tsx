import React from "react";
import { Button as AntButton, Spin, Popconfirm } from "antd";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import {
  useDeleteEmployeeship,
  useGetEmployeeshipById,
} from "@/queries/employeeship";

const Security: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetEmployeeshipById(id);

  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteEmployeeship();

  const onDelete = async (permanent: any = null, restore: any = null) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Employeeship Permanently.."
        : restore
        ? "Restoring Employeeship.."
        : "Deleting Employeeship..",
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
                <p className=" text-md font-semibold">Restore Employeeship</p>
                <p className="text-xs text-text-light">
                  Restoring a employeeship involves reinstating their previously
                  deleted or suspended account, and allowing them to regain
                  access and functionality."
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Restore Employeeship?"
                  description="Are you sure to restore the employeeship?"
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
                <p className=" text-md font-semibold">Delete Employeeship</p>
                <p className="text-xs text-text-light">
                  Deleting a employeeship involves temporarily removing their
                  account and associated data.
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Delete Employeeship?"
                  description="Are you sure to delete this employeeship?"
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
              Deleting a employeeship involves permanently removing their
              account and associated data. You will not be able to recover this
              employeeship.
            </p>
          </div>
          <div>
            <Popconfirm
              title="Delete Employeeship Permanently?"
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
