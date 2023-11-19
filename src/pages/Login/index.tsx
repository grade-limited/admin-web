import { Checkbox, Input } from "antd";
import React from "react";
import Iconify from "@components/iconify";
import { Controller, FieldValues, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import Label from "@components/Label";
import { Button } from "@mui/material";

const Login: React.FC = () => {
  const { login, isLoginLoading } = useAuth();
  const {
    // reset,
    handleSubmit,
    control,
  } = useForm({
    // resolver: joiResolver(loginResolver),
    defaultValues: {
      phone: "",
      password: "",
      remember: true,
    },
  });
  const onValid = async ({ phone, password, remember }: FieldValues) => {
    login(phone, password, remember);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <div className="flex flex-col items-center justify-between gap-5 p-10 rounded-md bg-white">
        <span className="flex flex-col items-center justify-center gap-2">
          <p className="text-5xl font-bold flex flex-row items-center justify-center">
            Welcome
          </p>
          <p className="text-md font-medium">Login to continue</p>
        </span>
        <form className="max-w-sm" onSubmit={handleSubmit(onValid)}>
          <Label>Phone</Label>
          <Controller
            control={control}
            name={"phone"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                prefix={
                  <Iconify
                    icon="ph:phone"
                    color="#999"
                    className="mr-1 text-lg"
                  />
                }
                className="my-2 text-md text-text-light"
                placeholder={"Enter Phone Number"}
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                //   suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Label>Password</Label>
          <Controller
            control={control}
            name={"password"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input.Password
                prefix={
                  <Iconify
                    icon="ri:lock-password-line"
                    color="#999"
                    className="mr-1 text-lg"
                  />
                }
                className="my-2 text-md text-text-light"
                placeholder={"Enter Password"}
                size="large"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                //   suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Controller
            control={control}
            name={"remember"}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                onChange={onChange}
                checked={value}
                className="text-sm font-semibold text-text-light"
              >
                Remember me
              </Checkbox>
            )}
          />

          <Button
            className="mt-2 uppercase bg-secondary-500 text-sm font-semibold"
            variant="contained"
            fullWidth
            size="large"
            type={"submit"}
            disabled={isLoginLoading}
          >
            LogIn
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
