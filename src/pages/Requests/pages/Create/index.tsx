import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Divider, Input, Upload as AntUpload, Button as AntButton } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateRequest } from "@/queries/requests";
import { Icon } from "@iconify/react";
import previewAttachment from "@/utilities/s3Attachment";
import instance from "@/services";

const Create: React.FC = () => {
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync: create, isLoading: requestCreating } =
    useCreateRequest();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Requests..",
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
        <p className="text-lg font-medium mb-2">Create New Request</p>

        <Link
          to={"/app/requests/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Requests</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Request Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <div className="flex flex-row items-center gap-10">
            <span>
              <Label>Thumbnail Image</Label>
              <Controller
                control={control}
                name={"thumbnail_url"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                )}
              />
            </span>
            <span>
              <Label>Cover Image</Label>
              <Controller
                control={control}
                name={"cover_url"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                )}
              />
            </span>
          </div>
          <div>
            <Label className="my-1">Request Name</Label>
            <Controller
              control={control}
              name={"name"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Enter Request Name"}
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
            <Label className="my-1">Description</Label>
            <Controller
              control={control}
              name={"description"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  placeholder={"Description"}
                  size={"large"}
                  className="relative w-full"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
        </div>

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4"
          disabled={requestCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
