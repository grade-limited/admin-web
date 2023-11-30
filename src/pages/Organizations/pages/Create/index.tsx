import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Cascader, Divider, Input } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateOrganization } from "@/queries/organizations";
import { IOption } from "@/queries/organizations/type";
import Iconify from "@components/iconify";

const Create: React.FC = () => {
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: create, isLoading: organizationCreating } =
    useCreateOrganization();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Organizations..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        create({
          ...data,
          business_type: data?.businessType?.[0],
          business_subtype: data?.businessType?.[1],
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

  const typeData: IOption[] = [
    {
      value: "Retail Shop",
      label: "Retail Shop",
      children: [
        {
          value: "Grocery",
          label: "Grocery",
        },
        {
          value: "Stationary",
          label: "Stationary",
        },
        {
          value: "Mobile ACC",
          label: "Mobile ACC",
        },
        {
          value: "Others",
          label: "Others",
        },
      ],
    },
    {
      value: "Hotel/Restaurant",
      label: "Hotel & Restaurants",
      children: [
        {
          value: "Hotel",
          label: "Hotel",
        },
        {
          value: "Restaurant",
          label: "Restaurant",
        },
        {
          value: "Cafe",
          label: "Cafe",
        },
      ],
    },
    {
      value: "Corporate Company",
      label: "Corporate Company",
      children: [
        {
          value: "Pharmacy & Hospitals",
          label: "Pharmacy & Hospitals",
        },
        {
          value: "Finance Institution",
          label: "Finance Institution",
        },
        {
          value: "Manufacturing Industry",
          label: "Manufacturing Industry",
        },
        {
          value: "NGO",
          label: "NGO",
        },
        {
          value: "Educational",
          label: "Educational",
        },
        {
          value: "others",
          label: "others",
        },
      ],
    },
  ];
  return (
    <div>
      <div className="max-w-md mt-6 mx-auto text-center">
        <p className="text-lg font-medium mb-2">Create New Organization</p>

        <Link
          to={"/app/organizations/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Organizations</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Organization Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <div>
            <Label isRequired className="my-1">
              Name
            </Label>
            <Controller
              control={control}
              name={"name"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Enter Organization Name"}
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
              Number
            </Label>
            <Controller
              control={control}
              name={"contact_number"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Number"}
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
            <Label isRequired className="my-1">
              Email
            </Label>
            <Controller
              control={control}
              name={"contact_email"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"Email"}
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
            <Label isRequired className="my-1">
              Business Type
            </Label>
            <Controller
              control={control}
              name={"businessType"}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Cascader
                  size={"large"}
                  placeholder={"Search Organization Type, Subtype.."}
                  className="relative w-full"
                  allowClear={false}
                  value={value}
                  showSearch
                  options={typeData}
                  onChange={onChange}
                  onBlur={onBlur}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
        </div>

        <p className="font-medium my-2">Social Media Information</p>

        <div className="border p-3 rounded-md bg-slate-50">
          <div>
            <Label className="my-1">Website Link</Label>
            <Controller
              control={control}
              name={"website_url"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"eg: https://www.mywebsite.com"}
                  size={"large"}
                  className="relative w-full"
                  prefix={
                    <Iconify icon="ph:globe-light" className="text-2xl mr-1" />
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div>
            <Label className="my-1">LinkedIn</Label>
            <Controller
              control={control}
              name={"linkedin_url"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"eg: https://www.linkedin.com/in/username/"}
                  size={"large"}
                  className="relative w-full"
                  prefix={
                    <Iconify icon="circum:linkedin" className="text-2xl mr-1" />
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div>
            <Label className="my-1">Facebook</Label>
            <Controller
              control={control}
              name={"facebook_url"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"eg: https://www.facebook.com/username/"}
                  size={"large"}
                  className="relative w-full"
                  prefix={
                    <Iconify
                      icon="ant-design:facebook-outlined"
                      className="text-2xl mr-1"
                    />
                  }
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                />
              )}
            />
          </div>
          <div>
            <Label className="my-1">Instagram</Label>
            <Controller
              control={control}
              name={"instagram_url"}
              rules={{ required: false }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder={"eg: https://www.instagram.com/username"}
                  size={"large"}
                  className="relative w-full"
                  prefix={
                    <Iconify
                      icon="iconoir:instagram"
                      className="text-2xl mr-1"
                    />
                  }
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
          disabled={organizationCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
