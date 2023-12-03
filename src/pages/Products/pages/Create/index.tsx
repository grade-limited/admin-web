import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Cascader, Divider, Input } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateProduct } from "@/queries/products";
import useBrand from "@/hooks/useBrand";
import Iconify from "@components/iconify";
import useCategory from "@/hooks/useCategory";
import DatePicker from "@components/antd/DatePicker";
import moment from "moment";

const Create: React.FC = () => {
  const { brand, isBrandLoading, searchBrand } = useBrand();
  const { category, isCategoryLoading, searchCategory } = useCategory();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
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
          <div>
            <Label className="my-1">Product Name</Label>
            <Controller
              control={control}
              name={"name"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Enter Product Name"}
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
          <div>
            <Label className="my-1">Brand</Label>
            <Controller
              control={control}
              name={"brand_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Cascader
                  value={value}
                  size="large"
                  showSearch
                  className="w-full"
                  placeholder={"Select a Brand..."}
                  suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                  onChange={onChange}
                  options={brand}
                  onSearch={searchBrand}
                  loading={isBrandLoading}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div>
            <Label className="my-1">Category</Label>
            <Controller
              control={control}
              name={"category_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Cascader
                  value={value}
                  size="large"
                  showSearch
                  className="w-full"
                  placeholder={"Select a Category..."}
                  suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                  onChange={onChange}
                  options={category}
                  onSearch={searchCategory}
                  loading={isCategoryLoading}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div className="mt-2">
            <Label className="my-1">Start & End Date </Label>
            <Controller
              control={control}
              name={"range"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <DatePicker.RangePicker
                  bordered={true}
                  size={"large"}
                  allowClear={false}
                  allowEmpty={[false, false]}
                  className="w-full min-w-[250px]"
                  presets={[
                    {
                      label: "Today",
                      value: [moment(), moment()],
                    },
                    {
                      label: "Tomorrow",
                      value: [moment().add(1, "days"), moment().add(1, "days")],
                    },
                    {
                      label: "Next 7 Days",
                      value: [moment().add(7, "days"), moment()],
                    },
                    {
                      label: "Next 30 Days",
                      value: [moment().add(30, "days"), moment()],
                    },
                    {
                      label: "Next 6 Months",
                      value: [moment().add(6, "months"), moment()],
                    },
                    {
                      label: "Next 1 Year",
                      value: [moment().add(1, "year"), moment()],
                    },
                  ]}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
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
          disabled={productCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
