import { useCreateUser } from "@/queries/users";
import instance from "@/services";
import handleResponse from "@/utilities/handleResponse";
import previewAttachment from "@/utilities/s3Attachment";
import Label from "@components/Label";
import DatePicker from "@components/antd/DatePicker";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { message } from "@components/antd/message";
import { joiResolver } from "@hookform/resolvers/joi";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import { EmployeeCreateResolver } from "@pages/Employees/pages/Create/resolver";
import {
  Input,
  Upload as AntUpload,
  Button as AntButton,
  Segmented,
} from "antd";
import moment from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const EmployeeCreate: React.FC<{ next: () => void; params: any }> = ({
  next,
  params,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    control,
    reset,
    formState: isDirty,
  } = useForm({
    resolver: joiResolver(EmployeeCreateResolver),
  });

  const [empInfo, setEmpInfo] = React.useState<any>(null);

  React.useEffect(() => {
    if (!params) return;
    setEmpInfo(params?.row);
  }, [params]);

  React.useEffect(() => {
    if (!empInfo || isDirty) return;
    reset({
      display_picture: empInfo?.display_picture,
      first_name: empInfo?.contact_person_name,
      last_name: undefined,
      contact_email: empInfo?.contact_email,
      phone: empInfo?.contact_person_phone,
      address: empInfo?.contact_person_address,
    });
  }, [empInfo]);

  console.log(empInfo);
  const { mutateAsync: Create, isLoading: isCreateLoading } = useCreateUser();

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating New Employee..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        Create({
          ...data,
          primary_contact: data?.phone,
          registered_from: "Website",
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      reset();
      next();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mb-4 mx-auto flex flex-col gap-2 px-3"
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
                  <Label className="pb-3">
                    Display Image Thumbnail Image
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
          <Label className="flex flex-row items-center gap-1 mt-2 my-1 text-text-dark">
            Gender
          </Label>
          <Controller
            control={control}
            name={"gender"}
            // rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Segmented
                block
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
            )}
          />
          <div>
            <Controller
              control={control}
              name={"password"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired>
                    Password
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input.Password
                    placeholder={"Password"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
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
                    value={value ? moment(value) : null}
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
              rules={{ required: false }}
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
                    // readOnly
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
        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white"
          disabled={isCreateLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
