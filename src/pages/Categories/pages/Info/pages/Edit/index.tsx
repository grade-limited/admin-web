import {
  useGetCategoriesById,
  useUpdateCategoriesById,
} from "@/queries/categories";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  Input,
  Spin,
  message,
  Upload as AntUpload,
  Button as AntButton,
  Image,
  ColorPicker,
  Cascader,
  // TreeSelect,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import moment from "moment";
// import useBrand from "@/hooks/useBrand";
import Iconify from "@components/iconify";
import instance from "@/services";
import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import useSearchCategory from "@/hooks/useSearchCategory";
import { joiResolver } from "@hookform/resolvers/joi";
import { categoryUpdateResolver } from "./resolver";
import ErrorSuffix from "@components/antd/ErrorSuffix";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useGetCategoriesById(id);
  const {
    isLoading: isCategoryLoading,
    data: category,
    findHierarchy,
  } = useSearchCategory();
  // const { brand, isBrandLoading, searchBrand, setDefaultBrand } = useBrand();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: joiResolver(categoryUpdateResolver),
  });
  const [categoryInfo, setCategoryInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isCategoryUpdating } =
    useUpdateCategoriesById();

  React.useEffect(() => {
    if (!data) return;
    setCategoryInfo(data);
    // setDefaultBrand(data?.brand);
  }, [data]);
  // console.log(categoryInfo, brand);

  // const findCategoryHierarchy = (categories: any[], categoryId: number, hierarchy = []) => {
  // 	for (const category of categories) {
  // 	  if (category.id === categoryId) {
  // 		hierarchy.unshift(category?.id ||);
  // 		if (category.parentId !== null) {
  // 		  findCategoryHierarchy(categories, category.parentId, hierarchy);
  // 		}
  // 		break;
  // 	  } else if (category.children.length > 0) {
  // 		findCategoryHierarchy(category.children, categoryId, hierarchy);
  // 	  }
  // 	}
  // 	return hierarchy;
  //   };

  React.useEffect(() => {
    if (!categoryInfo || isDirty) return;
    reset({
      name: categoryInfo?.name,
      description: categoryInfo?.description,
      parent_id: categoryInfo?.parent_id,
      thumbnail_url: categoryInfo?.thumbnail_url,
      cover_url: categoryInfo?.cover_url,
      icon_url: categoryInfo?.icon_url,
      color_code: categoryInfo?.color_code,

      parent_hierarchy: JSON.parse(
        JSON.stringify([
          categoryInfo?.parent?.parent_id,
          categoryInfo?.parent_id,
        ])
      ),
    });
  }, [categoryInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Category..",
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
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto">
          {data?.thumbnail_url ? (
            <Image
              className="rounded-2xl w-32 h-auto "
              src={previewAttachment(data?.thumbnail_url)}
              alt={data?.name}
              {...stringAvatar(data?.name)}
            />
          ) : (
            ""
          )}
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
            <div className="flex flex-row items-center justify-evenly gap-10">
              <span>
                <Controller
                  control={control}
                  name={"thumbnail_url"}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="pb-3">
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
                      <Label className="pb-3">
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
                      <Label className="pb-3">
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
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label isRequired>
                      Name
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
                name={"description"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-2">
                      Description
                      <ErrorSuffix error={error} size="small" />
                    </Label>
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
                        value
                          ? (findHierarchy(value) as any) || value
                          : undefined
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
          </div>

          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isCategoryUpdating}
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
