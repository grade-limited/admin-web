import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Cascader, Divider, Input } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateCategories } from "@/queries/categories";
// import useBrand from "@/hooks/useBrand";
import Iconify from "@components/iconify";
import useCategory from "@/hooks/useCategory";

const Create: React.FC = () => {
  // const { brand, isBrandLoading, searchBrand } = useBrand();
  const { category, isCategoryLoading, searchCategory } = useCategory();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
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
          <div>
            <Label className="my-1">Category Name</Label>
            <Controller
              control={control}
              name={"name"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Enter Category Name"}
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
            <Label className="my-1">Parent Category</Label>
            <Controller
              control={control}
              name={"parent_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Cascader
                  value={value}
                  size="large"
                  showSearch
                  className="w-full"
                  placeholder={"Select a Parent Category..."}
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