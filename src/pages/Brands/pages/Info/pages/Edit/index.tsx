import { useGetBrandsById, useUpdateBrandsById } from "@/queries/brands";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  Input,
  Spin,
  message,
  Upload as AntUpload,
  Button as AntButton,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import moment from "moment";
import instance from "@/services";
import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useGetBrandsById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [brandInfo, setBrandInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isBrandUpdating } =
    useUpdateBrandsById();

  React.useEffect(() => {
    if (!data) return;
    setBrandInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!brandInfo || isDirty) return;
    reset({
      name: brandInfo?.name,
      description: brandInfo?.description,
      thumbnail_url: brandInfo?.thumbnail_url,
      cover_url: brandInfo?.cover_url,
    });
  }, [brandInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Brand..",
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
        {contextHolder}
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 px-5 py-3 rounded-3xl max-w-xl mb-4 mx-auto">
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.name}
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
          <p className="font-medium mb-2">Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div className="flex flex-row items-center gap-10">
              <span>
                <Label className="pb-3">Thumbnail Image</Label>
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
                <Label className="pb-3">Cover Image</Label>
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
              <Label isRequired>Name</Label>
              <Controller
                control={control}
                name={"name"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder={"Enter Brand Name"}
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
              <Label isRequired>Description</Label>
              <Controller
                control={control}
                name={"description"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <JoditEditor
                    value={value}
                    config={{
                      statusbar: false,
                      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                      // placeholder: "Aa...",
                      removeButtons: ["image"],
                    }}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={(x) => {
                      onChange(x);
                    }} // preferred to use only this option to update the content for performance reasons
                    onChange={() => {}}
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
              disabled={isBrandUpdating}
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
