import React from "react";
import { Button as AntButton, Spin, Popconfirm, Select } from "antd";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import {
  useDeleteEmployeeship,
  useGetEmployeeshipById,
  useUpdateEmployeeshipById,
} from "@/queries/employeeship";
import { IOption } from "@/hooks/useRole/types";

const Security: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetEmployeeshipById(id);

  const { mutateAsync: update } = useUpdateEmployeeshipById();
  const [status, setStatus] = React.useState<any>(data?.employeeship_status);

  const onSubmit = async (id: any, data: any) => {
    message.open({
      type: "loading",
      content: "Updating Updateing Status..",
      duration: 0,
    });
    const res = await handleResponse(() => update({ id: id, data }));
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  const statusData: IOption[] = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "confirmed",
      label: "Confirmed",
    },
    {
      value: "declined",
      label: "Declined",
    },
  ];

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
        <p className="py-2 text-xl font-semibold text-green-500">Status Zone</p>
        <div className="grid grid-cols-3 border border-green-500 p-3 rounded-md gap-4 ">
          {status === "pending" ? (
            <>
              <div className="col-span-2">
                <p className=" text-md font-semibold">Change Status</p>
                <p className="text-xs text-text-light">
                  Changing status from pending to confiremd will add the
                  employee to the Organization. This cannot be changed
                  afterwards.
                </p>
              </div>
              <div>
                <Select
                  size={"large"}
                  placeholder={"Select Status"}
                  className="w-full"
                  bordered={true}
                  value={status}
                  disabled={status === "pending" ? false : true}
                  options={statusData}
                  onChange={(v) => {
                    onSubmit(id, { employeeship_status: v });
                    setStatus(v);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="col-span-2">
                <p className=" text-md font-semibold">Employee Status</p>
                <p className="text-xs text-text-light">
                  This status has already been updated. You cannot update the
                  status further.
                </p>
              </div>
              <div>
                <AntButton
                  className="float-right text-green-500 border-green-500 bg-white"
                  type="dashed"
                  disabled
                >
                  {data?.employeeship_status}
                </AntButton>
              </div>
            </>
          )}
        </div>
        <p className="py-2 text-xl font-semibold text-red-500">Danger Zone</p>
        <div className="grid grid-cols-3 border border-primary-100 p-3 rounded-md gap-4 ">
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
