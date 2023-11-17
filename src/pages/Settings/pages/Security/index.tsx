import React from "react";
import { Input, Typography, Divider } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Button } from "@mui/material";
// import { Icon } from "@iconify/react";
import useAuth from "@/hooks/useAuth";
import { message } from "@components/antd/message";
import { useUpdatePassword } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";

const Security: React.FC = () => {
  const { logout } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const { reset, handleSubmit, control } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: updatePassword, isLoading: isSubmitting } =
    useUpdatePassword();

  const onValid = async (d: FieldValues) => {
    messageApi.open({
      type: "loading",
      content: `Creating new password...`,
      duration: 0,
    });
    const res = await handleResponse(() => updatePassword({ ...d }), [200]);
    messageApi.destroy();
    if (res.status) {
      messageApi.success("Password updated successfully!");
      reset();
    } else messageApi.error(res.message);
  };
  return (
    <>
      {contextHolder}
      <div className="container max-w-sm mx-auto">
        <Typography className="pt-5 text-xl">Change Password</Typography>
        <form className="py-2" onSubmit={handleSubmit(onValid)}>
          <Typography className="flex flex-row items-center gap-1 my-1">
            Current Password
          </Typography>
          <Controller
            control={control}
            name={"current_password"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input.Password
                placeholder="Current Password"
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
              />
            )}
          />

          <Controller
            control={control}
            name={"new_password"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Typography className="flex flex-row items-center gap-1 mt-2 my-1">
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
                </Typography>
                <Input.Password
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
                <Typography className="flex flex-row items-center gap-1 mt-2 my-1">
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
                </Typography>
                <Input.Password
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
            className="mt-5 bg-slate-600"
            type="submit"
            disabled={isSubmitting}
          >
            Create New Password
          </Button>
        </form>
        <Divider />
        <Button
          size="large"
          variant="contained"
          fullWidth
          className="bg-error-dark"
          color={"error"}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default Security;
