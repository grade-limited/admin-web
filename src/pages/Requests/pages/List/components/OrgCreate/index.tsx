import { useCreateOrganization } from "@/queries/organizations";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { typeData } from "@pages/Organizations/pages/Create";
import { Cascader, Input } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const OrgCreate: React.FC<{ onClose: () => void; params: any }> = ({
  onClose,
  params,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(resolver),
  });

  const [orgInfo, setOrgInfo] = React.useState<any>([]);

  React.useEffect(() => {
    if (!params) return;
    setOrgInfo(params?.row);
  }, [params]);

  React.useEffect(() => {
    if (!orgInfo || isDirty) return;
    reset({
      organization_name: orgInfo?.organization_name,
      contact_email: orgInfo?.contact_email,
      contact_number: orgInfo?.contact_number,
      website_url: orgInfo?.website_url,
      linkedin_url: orgInfo?.linkedin_url,
      facebook_url: orgInfo?.facebook_url,
      instagram_url: orgInfo?.instagram_url,
    });
  }, [orgInfo]);

  const { mutateAsync: Create, isLoading: isCreateLoading } =
    useCreateOrganization();

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Requesting New Organization..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        Create({
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
      onClose();
    } else {
      message.error(res.message);
    }
  };

  return (
    <div className="max-w-xl mb-4 mx-auto flex flex-col gap-2 px-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="font-medium mb-2">Organization Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
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
                  <Label isRequired className="my-1">
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
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-1">
                    Contact Number
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
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-1">
                    Contact Email
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
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Label isRequired className="my-1">
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
      </form>
    </div>
  );
};

export default OrgCreate;
