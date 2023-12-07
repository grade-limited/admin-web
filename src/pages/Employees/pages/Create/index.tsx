import React from "react";
import useRole from "@/hooks/useRole";
import { useCreateEmployee } from "@/queries/employees";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  DatePicker,
  Divider,
  Input,
  Select,
  Upload as AntUpload,
  Button as AntButton,
} from "antd";
import Iconify from "@components/iconify";
import { Button } from "@mui/material";
import * as dayjs from "dayjs";
import { Link } from "react-router-dom";
import instance from "@/services";
import previewAttachment from "@/utilities/s3Attachment";
import { Icon } from "@iconify/react";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { joiResolver } from "@hookform/resolvers/joi";
import { EmployeeCreateResolver } from "./resolver";

const Create: React.FC = () => {
  // Get Roles
  const [messageApi, contextHolder] = message.useMessage();

  const { role, isRoleLoading, searchRole } = useRole();
  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(EmployeeCreateResolver),
  });
  const { mutateAsync: create, isLoading: employeeCreating } =
    useCreateEmployee();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Employee..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        create({
          ...data,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      reset();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="max-w-md mt-6 mx-auto text-center">
        <p className="text-lg font-medium mb-2">Create New Employee</p>
        <p className="text-sm text-text-light">
          This page allows administrators to input and store essential
          information about a new employee, such as personal details, job role,
          and contact information, for organizational record-keeping.
        </p>
        <Link
          to={"/app/employees/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Employees</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Personal Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <span>
            <Controller
              control={control}
              name={"display_picture"}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label>
                    Display Image
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <AntUpload
                    fileList={
                      value
                        ? [
                            {
                              uid: value,
                              url: previewAttachment(value),
                              preview: previewAttachment(value),
                              thumbUrl: previewAttachment(value),
                              name: value,
                              fileName: value,
                              status: "done",
                              error,
                            },
                          ]
                        : undefined
                    }
                    maxCount={1}
                    listType="picture-card"
                    showUploadList={{
                      showDownloadIcon: true,
                    }}
                    action={`${instance.getUri()}files/upload/multiple`}
                    method="POST"
                    name="files"
                    onChange={(i) => {
                      if (i.file.status === "done") {
                        onChange(i.file.response?.[0]?.filename);
                      }
                      //   if (i.file.status === "success") {
                      //     messageApi.info("Please click update to save changes");
                      //   }

                      if (i.file.status === "removed") onChange(null);

                      if (i.file.status === "error") {
                        messageApi.error(i.file.response?.message);
                      }
                    }}
                  >
                    {value ? null : (
                      <AntButton
                        className="flex flex-col items-center justify-center text-sm gap-1"
                        type="text"
                      >
                        <span>
                          <Icon icon={"material-symbols:upload"} />
                        </span>
                        Upload
                      </AntButton>
                    )}
                  </AntUpload>
                </>
              )}
            />
          </span>
          <div>
            <Label isRequired>Full Name</Label>
            <Input.Group compact>
              <Controller
                control={control}
                name={"first_name"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className="w-1/2"
                    placeholder={"Enter First Name"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
              <Controller
                control={control}
                name={"last_name"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    className="w-1/2"
                    placeholder={"Enter Last Name"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </Input.Group>
          </div>

          <div>
            <Controller
              control={control}
              name={"gender"}
              rules={{ required: false }}
              defaultValue={"Male"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Gender
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Select
                    placeholder={"Gender"}
                    size={"large"}
                    className="relative w-full"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Non Binary", label: "Non Binary" },
                    ]}
                  />
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name={"dob"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="mt-2 mb-1">
                    Date of Birth
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <DatePicker
                    size="large"
                    className={"w-full"}
                    allowClear
                    placeholder="Date of Birth"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ? dayjs(value) : null}
                  />
                </>
              )}
            />
          </div>
        </div>

        <p className="font-medium mb-2 mt-4">Contact Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <div>
            <Controller
              control={control}
              name={"email"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Email
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input
                    placeholder={"Enter Email Address"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name={"phone"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-1">
                    Phone
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input
                    // disabled
                    placeholder={"Enter Phone Number"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name={"address"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Address
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input.TextArea
                    placeholder={"Enter Address..."}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={4}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                </>
              )}
            />
          </div>
        </div>

        <p className="font-medium mb-2 mt-4">Access Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <Controller
            control={control}
            name={"password"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <div>
                  <Label
                    isRequired
                    className="flex flex-row items-center gap-1"
                  >
                    Password
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input.Password
                    placeholder="Enter Password"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                </div>
              </>
            )}
          />

          <div>
            <Controller
              control={control}
              name={"role_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Role
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Select
                    value={value}
                    size="large"
                    showSearch
                    className="w-full"
                    placeholder={"Select a Role..."}
                    suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                    onChange={onChange}
                    options={role}
                    onSearch={searchRole}
                    loading={isRoleLoading}
                    status={error ? "error" : ""}
                  />
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name={"max_session"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Maximum Device
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input
                    placeholder={"4"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                </>
              )}
            />
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white"
          disabled={employeeCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
