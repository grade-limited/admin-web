import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  Input,
  Select,
  Spin,
  message,
  Upload as AntUpload,
  Button as AntButton,
  Image,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import moment from "moment";
import { useGetUsersById, useUpdateUsersById } from "@/queries/users";
import instance from "@/services";
import { Icon } from "@iconify/react";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { userUpdateResolver } from "./resolver";
import { joiResolver } from "@hookform/resolvers/joi";
import DatePicker from "@components/antd/DatePicker";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useGetUsersById(id);
  //   const { role, isRoleLoading, searchRole } = useRole();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: joiResolver(userUpdateResolver),
  });
  const [userInfo, setUserInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isUserUpdating } =
    useUpdateUsersById();

  React.useEffect(() => {
    if (!data) return;
    setUserInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!userInfo || isDirty) return;
    reset({
      first_name: userInfo?.first_name,
      last_name: userInfo?.last_name,
      email: userInfo?.email,
      gender: userInfo?.gender,
      phone: userInfo?.phone,
      display_picture: userInfo?.display_picture,
      dob: userInfo?.dob,
      max_session: userInfo?.max_session,
      address: userInfo?.address,
    });
  }, [userInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating User..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      update({
        id,
        data,
      })
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
    <Spin spinning={isLoading}>
      {contextHolder}
      <div>
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto">
          <Image
            className="rounded-2xl w-32 h-32 aspect-square"
            src={previewAttachment(data?.display_picture)}
            alt={[data?.first_name, data?.last_name].join(" ")}
            // {...stringAvatar([data?.first_name, data?.last_name].join(" "))}
          />
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {[data?.first_name, data?.last_name].join(" ")}{" "}
            </p>
            <p className="text-text-light font-semibold">
              @{data?.username || "-"}
            </p>

            <p className="text-text-light text-xs mt-2">
              Created {moment(data?.created_at).calendar()}
            </p>
            <p className="text-text-light text-xs">
              Last Updated {moment(data?.updated_at).calendar()}
            </p>
          </div>
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
                    <Label className="my-1">
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
          <p className="font-medium mb-2 mt-4">Access Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div>
              <Controller
                control={control}
                name={"max_session"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label isRequired className="my-1">
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
          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isUserUpdating}
            >
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </Spin>
  );
};

export default Edit;
