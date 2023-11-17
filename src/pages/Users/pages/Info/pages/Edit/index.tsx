import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { DatePicker, Input, Select, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import moment from "moment";
import { useGetUsersById, useUpdateUsersById } from "@/queries/users";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUsersById(id);
  //   const { role, isRoleLoading, searchRole } = useRole();
  console.log(data);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
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
      <div>
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto">
          <Avatar
            className="rounded-2xl w-32 h-32 aspect-square"
            variant="square"
            src={previewAttachment(data?.display_picture)}
            alt={[data?.first_name, data?.last_name].join(" ")}
            {...stringAvatar([data?.first_name, data?.last_name].join(" "))}
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
                      //   suffix={<ErrorSuffix error={error} />}
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
                      //   suffix={<ErrorSuffix error={error} />}
                    />
                  )}
                />
              </Input.Group>
            </div>

            <div>
              <Label className="my-1">Gender</Label>
              <Controller
                control={control}
                name={"gender"}
                rules={{ required: false }}
                defaultValue={"Male"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
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
                )}
              />
            </div>

            <div>
              <Label className="mt-2 mb-1">Date of Birth</Label>
              <Controller
                control={control}
                name={"dob"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    size="large"
                    className={"w-full"}
                    allowClear
                    placeholder="Date of Birth"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ? dayjs(value) : null}
                  />
                )}
              />
            </div>
          </div>

          <p className="font-medium mb-2 mt-4">Contact Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div>
              <Label className="my-1">Email</Label>
              <Controller
                control={control}
                name={"email"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Enter Email Address"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>

            <div>
              <Label isRequired className="my-1">
                Phone
              </Label>
              <Controller
                control={control}
                name={"phone"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    readOnly
                    // disabled
                    placeholder={"Enter Phone Number"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                )}
              />
            </div>

            <div>
              <Label className="my-1">Address</Label>
              <Controller
                control={control}
                name={"address"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
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
                )}
              />
            </div>
          </div>

          <p className="font-medium mb-2 mt-4">Access Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div>
              <Label className="my-1">Maximum Device</Label>
              <Controller
                control={control}
                name={"max_session"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"4"}
                    size={"large"}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
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
