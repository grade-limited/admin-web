import React from "react";
import { Input, Divider, Button as AntButton, Spin, Popconfirm } from "antd";
import {
  Controller,
  //  FieldValues,
  useForm,
} from "react-hook-form";
import { Button } from "@mui/material";
import Label from "@components/Label";
import { useParams } from "react-router-dom";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import {
  useDeleteEmployee,
  useGetEmployeesById,
  useSuspendEmployee,
} from "@/queries/employees";

const Security: React.FC = () => {
  const {
    control,
    formState: { isDirty },
  } = useForm({});

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetEmployeesById(id);

  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteEmployee();

  const onDelete = async (permanent: any = null, restore: any = null) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Employee Permanently.."
        : restore
        ? "Restoring Employee.."
        : "Deleting Employee..",
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

  const { mutateAsync: Suspend, isLoading: isSuspendLoading } =
    useSuspendEmployee();

  const onSuspend = async () => {
    message.open({
      type: "loading",
      content: "Suspending Employee..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      Suspend({
        id,
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
        <p className="pt-5 text-xl">Change Password</p>
        <form className="my-2 p-3 border border-slate-200 rounded-md">
          <Controller
            control={control}
            name={"new_password"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label className="mb-2">
                  New Password
                  {/* {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Password should be atleast 6 characters long."}
                       placement="topLeft"
                    >
                       <Icon color={"action"} className="text-base mb-1">
                        <AiFillInfoCircle />
                      </Icon> 
                    </Tooltip>
                  )}  */}
                </Label>
                <Input.Password
                  readOnly
                  placeholder="New Password"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name={"cpassword"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label className="my-2">
                  Confirm New Password
                  {/* {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Re-enter your new password"}
                      placement="topLeft"
                    >
                      <Icon icon="ph:info-fill" />
                    </Tooltip>
                  )} */}
                </Label>
                <Input.Password
                  readOnly
                  placeholder="Confirm New Password"
                  size="large"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              </>
            )}
          />
          <Button
            size="large"
            variant="contained"
            fullWidth
            className="mt-5 bg-slate-600 disabled:bg-slate-300"
            type="submit"
            disabled={!isDirty}
          >
            Save Changes
          </Button>
        </form>
        <Divider />
        <p className="py-2 text-xl font-semibold text-red-500">Danger Zone</p>
        <div className="grid grid-cols-3 border border-primary-100 p-3 rounded-md gap-4 ">
          {data?.deleted_at ? (
            <>
              <div className="col-span-2">
                <p className=" text-md font-semibold">Restore Employee</p>
                <p className="text-xs text-text-light">
                  Restoring a employee involves reinstating their previously
                  deleted or suspended account, and allowing them to regain
                  access and functionality."
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Restore Employee?"
                  description="Are you sure to restore the employee?"
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
              {data?.is_active ? (
                <>
                  <div className="col-span-2">
                    <p className=" text-md font-semibold">Suspend Employee</p>
                    <p className="text-xs text-text-light">
                      Suspending a employee involves temporarily restricting
                      their access to an online platform.
                    </p>
                  </div>
                  <div>
                    <Popconfirm
                      title="Suspend Employee?"
                      description="Are you sure to suspend employee?"
                      onConfirm={() => onSuspend()}
                      okButtonProps={{
                        type: "primary",
                        style: {
                          backgroundColor: "#EF4444",
                          borderColor: "#EF4444",
                        },
                        loading: isSuspendLoading,
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
                        Suspend
                      </AntButton>
                    </Popconfirm>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-2">
                    <p className=" text-md font-semibold">Activate Employee</p>
                    <p className="text-xs text-text-light">
                      Activating employee will activate the temporarily
                      restricted/suspended employee.
                    </p>
                  </div>
                  <div>
                    <Popconfirm
                      title="Activate Employee?"
                      description="Are you sure to activate employee?"
                      onConfirm={() => onSuspend()}
                      okButtonProps={{
                        type: "primary",
                        style: {
                          backgroundColor: "#EF4444",
                          borderColor: "#EF4444",
                        },
                        loading: isSuspendLoading,
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
                        Activate
                      </AntButton>
                    </Popconfirm>
                  </div>
                </>
              )}
              <div className="col-span-2">
                <p className=" text-md font-semibold">Delete Employee</p>
                <p className="text-xs text-text-light">
                  Deleting a employee involves temporarily removing their
                  account and associated data.
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Delete Employee?"
                  description="Are you sure to delete this employee?"
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
              Deleting a employee involves permanently removing their account
              and associated data. You will not be able to recover this
              employee.
            </p>
          </div>
          <div>
            <Popconfirm
              title="Delete Employee Permanently?"
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
