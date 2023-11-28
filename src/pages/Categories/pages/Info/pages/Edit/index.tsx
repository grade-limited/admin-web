import { useGetProductsById, useUpdateProductsById } from "@/queries/products";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Cascader, Input, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import moment from "moment";
import useBrand from "@/hooks/useBrand";
import useCategory from "@/hooks/useCategory";
import Iconify from "@components/iconify";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetProductsById(id);
  const { category, isCategoryLoading, searchCategory, setdefaultcategory } =
    useCategory();
  const { brand, isBrandLoading, searchBrand, setDefaultBrand } = useBrand();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [productInfo, setProductInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isProductUpdating } =
    useUpdateProductsById();

  React.useEffect(() => {
    if (!data) return;
    setProductInfo(data);
    setdefaultcategory(data?.category);
    setDefaultBrand(data?.brand);
  }, [data]);
  // console.log(productInfo, brand);

  React.useEffect(() => {
    if (!productInfo || isDirty) return;
    reset({
      name: productInfo?.name,
      description: productInfo?.description,
      brand_id: productInfo?.brand_id,
      category_id: productInfo?.category_id,
    });
  }, [productInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Product..",
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
              <Label isRequired>Description</Label>
              <Controller
                control={control}
                name={"description"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    placeholder={"Enter Description of the Product"}
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
                    dropdownMatchSelectWidth
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
          </div>

          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isProductUpdating}
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
