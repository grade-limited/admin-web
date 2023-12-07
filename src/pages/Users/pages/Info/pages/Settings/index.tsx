import React from "react";
import {
  Input,
  Divider,
  Button as AntButton,
  Spin,
  Popconfirm,
  Tooltip,
} from "antd";
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
  useDeleteUser,
  useGetUsersById,
  useSuspendUser,
} from "@/queries/users";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { Icon } from "@iconify/react";

const Security: React.FC = () => {
  const {
    control,
    formState: { isDirty },
  } = useForm({});

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUsersById(id);

  const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteUser();

  const onDelete = async (permanent: any = null, restore: any = null) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting User Permanently.."
        : restore
        ? "Restoring User.."
        : "Deleting User..",
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
    useSuspendUser();

  const onSuspend = async () => {
    message.open({
      type: "loading",
      content: "Suspending User..",
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
                  {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Password should be atleast 6 characters long."}
                      placement="topLeft"
                    >
                      <Icon icon="ph:info-fill" />
                    </Tooltip>
                  )}
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
                  {error ? (
                    <ErrorSuffix error={error} />
                  ) : (
                    <Tooltip
                      title={"Re-enter your new password"}
                      placement="topLeft"
                    >
                      <Icon icon="ph:info-fill" />
                    </Tooltip>
                  )}
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
                <p className=" text-md font-semibold">Restore User</p>
                <p className="text-xs text-text-light">
                  Restoring a user involves reinstating their previously deleted
                  or suspended account, and allowing them to regain access and
                  functionality."
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Restore User?"
                  description="Are you sure to restore the user?"
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
                    <p className=" text-md font-semibold">Suspend User</p>
                    <p className="text-xs text-text-light">
                      Suspending a user involves temporarily restricting their
                      access to an online platform.
                    </p>
                  </div>
                  <div>
                    <Popconfirm
                      title="Suspend User?"
                      description="Are you sure to suspend user?"
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
                    <p className=" text-md font-semibold">Activate User</p>
                    <p className="text-xs text-text-light">
                      Activating user will activate the temporarily
                      restricted/suspended user.
                    </p>
                  </div>
                  <div>
                    <Popconfirm
                      title="Activate User?"
                      description="Are you sure to activate user?"
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
                <p className=" text-md font-semibold">Delete User</p>
                <p className="text-xs text-text-light">
                  Deleting a user involves temporarily removing their account
                  and associated data.
                </p>
              </div>
              <div>
                <Popconfirm
                  title="Delete User?"
                  description="Are you sure to delete this user?"
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
              Deleting a user involves permanently removing their account and
              associated data. You will not be able to recover this user.
            </p>
          </div>
          <div>
            <Popconfirm
              title="Delete User Permanently?"
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
