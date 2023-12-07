import {
  useGetOrganizationsById,
  useUpdateOrganizationsById,
} from "@/queries/organizations";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Cascader, Input, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import moment from "moment";
import Iconify from "@components/iconify";
import { IOption } from "@/queries/organizations/type";
import { organizationUpdateResolver } from "./resolver";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorSuffix from "@components/antd/ErrorSuffix";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOrganizationsById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: joiResolver(organizationUpdateResolver),
  });
  const [organizationInfo, setOrganizationInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isOrganizationUpdating } =
    useUpdateOrganizationsById();

  React.useEffect(() => {
    if (!data) return;
    setOrganizationInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!organizationInfo || isDirty) return;
    reset({
      name: organizationInfo?.name,
      contact_number: organizationInfo?.contact_number,
      contact_email: organizationInfo?.contact_email,
      businessType: [
        organizationInfo?.business_type,
        organizationInfo?.business_subtype,
      ],
      website_url: organizationInfo?.website_url,
      linkedin_url: organizationInfo?.linkedin_url,
      facebook_url: organizationInfo?.facebook_url,
      instagram_url: organizationInfo?.instagram_url,
    });
  }, [organizationInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Organization..",
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
    <Spin spinning={isLoading}>
      <div>
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto">
          <div className="p-4">
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
          <p className="font-medium mb-2">Organization Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div>
              <Controller
                control={control}
                name={"name"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Name
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"Enter Organization Name"}
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
                name={"contact_number"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Number
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"Number"}
                      size={"large"}
                      className="relative w-full"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"contact_email"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Email
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"Email"}
                      size={"large"}
                      className="relative w-full"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"businessType"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Business Type
                      <ErrorSuffix error={error} size="small" />
                    </Label>
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
                  </>
                )}
              />
            </div>
          </div>

          <p className="font-medium my-2">Social Media Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div>
              <Controller
                control={control}
                name={"website_url"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Website Link
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"eg: https://www.mywebsite.com"}
                      size={"large"}
                      className="relative w-full"
                      prefix={
                        <Iconify
                          icon="ph:globe-light"
                          className="text-2xl mr-1"
                        />
                      }
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"linkedin_url"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      LinkedIn
                      <ErrorSuffix error={error} size="small" />
                    </Label>
                    <Input
                      placeholder={"eg: https://www.linkedin.com/in/username/"}
                      size={"large"}
                      className="relative w-full"
                      prefix={
                        <Iconify
                          icon="circum:linkedin"
                          className="text-2xl mr-1"
                        />
                      }
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"facebook_url"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Facebook
                      <ErrorSuffix error={error} size="small" />
                    </Label>
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
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"instagram_url"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Label className="my-1">
                      Instagram
                      <ErrorSuffix error={error} size="small" />
                    </Label>
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
              disabled={isOrganizationUpdating}
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
