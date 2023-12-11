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
  Select,
} from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateProduct } from "@/queries/products";
import useBrand from "@/hooks/useBrand";
import Iconify from "@components/iconify";
import useCategory from "@/hooks/useCategory";
import instance from "@/services";
import previewAttachment from "@/utilities/s3Attachment";
import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { productCreateResolver } from "./resolver";
import ErrorSuffix from "@components/antd/ErrorSuffix";

const Create: React.FC = () => {
  const { brand, isBrandLoading, searchBrand } = useBrand();
  const { category, isCategoryLoading, searchCategory } = useCategory();
  const { handleSubmit, control, reset, getValues } = useForm({
    resolver: joiResolver(productCreateResolver),
  });

  console.log(getValues());

  const [messageApi, contextHolder] = message.useMessage();
  const { mutateAsync: create, isLoading: productCreating } =
    useCreateProduct();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Product..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        create({
          ...data,
          start_date: data?.range?.[0],
          end_date: data?.range?.[1],
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
        <p className="text-lg font-medium mb-2">Create New Product</p>

        <Link
          to={"/app/products/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Products</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Product Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <Controller
            control={control}
            name={"thumbnail_url"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
          <div>
            <Controller
              control={control}
              name={"name"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-2">
                    Product Name
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Input
                    placeholder={"Enter Product Name"}
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

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <Controller
                control={control}
                name={"sku"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-2">
                      SKU Code
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"Enter Product SKU Code"}
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

            <div className="flex-1">
              <Controller
                control={control}
                name={"unit_of_measure"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-2">
                      Unit of Measure
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"Enter Unit of Measure"}
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
                  <Label className="my-2">
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
          <Controller
            control={control}
            name={"attachments"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Label className="my-2">
                  Product Gallery
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <AntUpload
                  fileList={
                    !!value?.length
                      ? Array.from(value, (x: any) => ({
                          uid: value,
                          url: previewAttachment(x),
                          preview: previewAttachment(x),
                          thumbUrl: previewAttachment(x),
                          name: value,
                          fileName: value,
                          status: "done",
                          error,
                        }))
                      : undefined
                  }
                  listType="picture-card"
                  showUploadList={{
                    showDownloadIcon: true,
                  }}
                  action={`${instance.getUri()}files/upload/multiple`}
                  method="POST"
                  name="files"
                  onChange={(i) => {
                    if (i.file.status === "done") {
                      onChange(
                        Array.from(
                          i.fileList,
                          (x: any) => x.response?.[0]?.filename
                        )
                      );
                    }
                    //   if (i.file.status === "success") {
                    //     messageApi.info("Please click update to save changes");
                    //   }

                    if (i.file.status === "removed") onChange([]);

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
          <div>
            <Controller
              control={control}
              name={"category_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-2">
                    Category
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  <Cascader
                    value={value}
                    size="large"
                    showSearch
                    className="w-full"
                    placeholder={"Select a Category..."}
                    suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                    onChange={(v) => onChange(v?.[v?.length - 1])}
                    options={category}
                    onSearch={searchCategory}
                    loading={isCategoryLoading}
                    status={error ? "error" : ""}
                  />
                </>
              )}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2">
              <Controller
                control={control}
                name={"brand_id"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-2">
                      Brand
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Cascader
                      value={value}
                      size="large"
                      showSearch
                      className="w-full"
                      placeholder={"Select a Brand..."}
                      suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                      onChange={(v) => onChange(v?.[0])}
                      options={brand}
                      onSearch={searchBrand}
                      loading={isBrandLoading}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
            <div className="col-span-2">
              <Controller
                control={control}
                name={"market_price"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-2">
                      Market Price
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      value={value}
                      size="large"
                      className="w-full"
                      placeholder={"Enter Market Price"}
                      onChange={onChange}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
          </div>

          <div>
            {/* 
              minimum_order_quantity: {
                account_type: string;
                quantity: number;
              }[]
              
              */}
            <Controller
              control={control}
              name={"minimum_order_quantity"}
              render={({
                field: { onChange, value = [] },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-2">
                    Minimum Order Quantity
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  {value?.map((x: any, i: number) => (
                    <div className="flex flex-row gap-2 mb-2">
                      <Select
                        size="large"
                        value={x?.account_type}
                        className="w-full"
                        onChange={(v) => {
                          const temp = [...value];
                          temp[i].account_type = v;
                          onChange(temp);
                        }}
                      >
                        <Select.Option value="b2b">Business</Select.Option>
                        <Select.Option value="bb2e">Employee</Select.Option>
                      </Select>
                      <Input
                        size="large"
                        value={x?.quantity}
                        className="w-full"
                        onChange={(v) => {
                          const temp = [...value];
                          temp[i].quantity = v.target.value;
                          onChange(temp);
                        }}
                        prefix={"Min Qty:"}
                      />
                      <Button
                        onClick={() => {
                          const temp = [...value];
                          temp.splice(i, 1);
                          onChange(temp);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    fullWidth
                    variant="outlined"
                    className="mt-2"
                    onClick={() => {
                      onChange([
                        ...value,
                        { account_type: "b2b", quantity: 0 },
                      ]);
                    }}
                  >
                    Add Minimum Order Quantity
                  </Button>
                </>
              )}
            />

            {/* 
            'price': {
                account_type: string;
                min_quantity: number;
                per_unit: number;
              }[];
            */}

            <Controller
              control={control}
              name={"price"}
              render={({
                field: { onChange, value = [] },
                fieldState: { error },
              }) => (
                <>
                  <Label className="my-2">
                    Price Chart
                    <ErrorSuffix error={error} size="small" />
                  </Label>
                  {value?.map((x: any, i: number) => (
                    <div className="flex flex-row gap-2 mb-2">
                      <Select
                        size="large"
                        value={x?.account_type}
                        className="w-full"
                        onChange={(v) => {
                          const temp = [...value];
                          temp[i].account_type = v;
                          onChange(temp);
                        }}
                      >
                        <Select.Option value="b2b">Business</Select.Option>
                        <Select.Option value="bb2e">Employee</Select.Option>
                      </Select>
                      <Input
                        size="large"
                        value={x?.min_quantity}
                        className="w-full"
                        onChange={(v) => {
                          const temp = [...value];
                          temp[i].min_quantity = v.target.value;
                          onChange(temp);
                        }}
                        prefix={"Min Qty:"}
                      />
                      <Input
                        size="large"
                        value={x?.per_unit}
                        className="w-full"
                        onChange={(v) => {
                          const temp = [...value];
                          temp[i].per_unit = v.target.value;
                          onChange(temp);
                        }}
                        prefix={"Unit Cost:"}
                      />
                      <Button
                        onClick={() => {
                          const temp = [...value];
                          temp.splice(i, 1);
                          onChange(temp);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    fullWidth
                    variant="outlined"
                    className="mt-2"
                    onClick={() => {
                      onChange([
                        ...value,
                        { account_type: "b2b", min_quantity: 0, per_unit: 0 },
                      ]);
                    }}
                  >
                    Add Price
                  </Button>
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
          disabled={productCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
