import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  Cascader,
  Divider,
  Input,
  Upload as AntUpload,
  Button as AntButton,
  ColorPicker,
} from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateCategories } from "@/queries/categories";
// import useBrand from "@/hooks/useBrand";
import Iconify from "@components/iconify";
import previewAttachment from "@/utilities/s3Attachment";
import { Icon } from "@iconify/react";
import instance from "@/services";
import useSearchCategory from "@/hooks/useSearchCategory";
import JoditEditor from "jodit-react";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { joiResolver } from "@hookform/resolvers/joi";
import { categoryCreateResolver } from "./resolver";

const Create: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    isLoading: isCategoryLoading,
    data: category,
    findHierarchy,
  } = useSearchCategory();
  const { handleSubmit, control, reset } = useForm({
    resolver: joiResolver(categoryCreateResolver),
  });

  const { mutateAsync: create, isLoading: categoryCreating } =
    useCreateCategories();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Category..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        create({
          ...data,
          parent_id: data.parent_id?.[data.parent_id?.length - 1] || null,
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
        <p className="text-lg font-medium mb-2">Create New Category</p>

        <Link
          to={"/app/categories/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Categories</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Category Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <div className="flex flex-row items-center justify-between px-8">
            <span>
              <Controller
                control={control}
                name={"thumbnail_url"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label>
                      Thumbnail Image
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
            <span>
              <Controller
                control={control}
                name={"cover_url"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label>
                      Cover Image
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

            <span>
              <Controller
                control={control}
                name={"icon_url"}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label>
                      Icon Image
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
          </div>
          <div>
            <Controller
              control={control}
              name={"color_code"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Thumbnail Color
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <ColorPicker
                    size={"large"}
                    onChange={(_v, hex) => onChange(hex)}
                    value={value}
                    defaultFormat="hex"
                    format="hex"
                    allowClear
                    onClear={() => onChange(null)}
                    //   suffix={<ErrorSuffix error={error} />}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name={"name"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-1">
                    Category Name
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input
                    placeholder={"Enter Category Name"}
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
              name={"parent_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Parent Category
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Cascader
                    value={
                      value ? (findHierarchy(value) as any) || value : undefined
                    }
                    size="large"
                    showSearch
                    className="w-full"
                    placeholder={"Select a Parent Category..."}
                    suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                    onChange={onChange}
                    options={category}
                    fieldNames={{ label: "name", value: "id" }}
                    onBlur={onBlur}
                    changeOnSelect
                    // onSearch={searchCategory}
                    loading={isCategoryLoading}
                    status={error ? "error" : ""}
                    expandTrigger="hover"
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name={"description"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-1">
                    Description
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  {/* <Input.TextArea
                    placeholder={"Description"}
                    size={"large"}
                    className="relative w-full"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  /> */}
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
                </>
              )}
            />
          </div>
        </div>
        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4"
          disabled={categoryCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
