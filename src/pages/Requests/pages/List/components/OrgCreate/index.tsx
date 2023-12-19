import { useCreateOrganization } from "@/queries/organizations";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { message } from "@components/antd/message";
import { Input } from "antd";
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
      status: orgInfo?.status,
      expected_delivery_date: orgInfo?.expected_delivery_date,
      delivery_fee: orgInfo?.delivery_fee,
      discount: orgInfo?.discount,
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
        <div>
          <Controller
            control={control}
            name={"organization_name"}
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
            name={"contact_email"}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label>
                  Email
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input
                  // readOnly
                  // disabled
                  placeholder={"Enter Phone Number"}
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
                <Label isRequired>
                  Phone
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input
                  placeholder={"Enter Phone Number"}
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
            name={"contact_address"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label isRequired>
                  Address
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input.TextArea
                  placeholder={"Enter Address"}
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
            name={"website_url"}
            rules={{ required: false }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label>
                  Website
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input
                  placeholder={"eg: https://www.mywebsite.com"}
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
            name={"linkedin_url"}
            rules={{ required: false }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label>
                  LinkedIn Profile
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input
                  placeholder={"eg: https://www.linkedin.com/in/username/"}
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
            name={"facebook_url"}
            rules={{ required: false }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label>
                  Facebook Profile
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input
                  placeholder={"eg: https://www.facebook.com/username/"}
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
            name={"instagram_url"}
            rules={{ required: false }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <Label>
                  Instagram Profile
                  <ErrorSuffix error={error} size="small" />
                </Label>
                <Input
                  placeholder={"eg: https://www.instagram.com/username"}
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
      </form>
    </div>
  );
};

export default OrgCreate;
