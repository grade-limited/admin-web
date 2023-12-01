import {
  useGetCampaignsById,
  useUpdateCampaignsById,
} from "@/queries/campaigns";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  Input,
  Upload as AntUpload,
  Button as AntButton,
  Cascader,
  Spin,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import moment from "moment";
import { IOption } from "@/queries/organizations/type";
import DatePicker from "@components/antd/DatePicker";
import { Icon } from "@iconify/react";
import { message } from "@components/antd/message";
import previewAttachment from "@/utilities/s3Attachment";
import instance from "@/services";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCampaignsById(id);
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [campaignInfo, setCampaignInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isCampaignUpdating } =
    useUpdateCampaignsById();

  React.useEffect(() => {
    if (!data) return;
    setCampaignInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!campaignInfo || isDirty) return;
    reset({
      name: campaignInfo?.name,
      thumbnail_url: campaignInfo?.thumbnail_url,
      cover_url: campaignInfo?.cover_url,
      description: campaignInfo?.description,
      publish_date: campaignInfo?.publish_date,
      start_date: campaignInfo?.start_date,
      end_date: campaignInfo?.end_date,
      amount: campaignInfo?.amount,
      amount_type: campaignInfo?.amount_type,
      campaign_type: campaignInfo?.campaign_type,
    });
  }, [campaignInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Campaign..",
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
      value: "amount",
      label: "Amount",
    },
    {
      value: "percentage",
      label: "Percentage",
    },
  ];
  const campaignTypeData: IOption[] = [
    {
      value: "stock_clearance",
      label: "Stock Clearance",
    },
    {
      value: "occasion",
      label: "Occasions",
    },
    {
      value: "festival",
      label: "Festival",
    },
  ];
  return (
    <Spin spinning={isLoading}>
      {contextHolder}
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
          <p className="font-medium mb-2">Basic Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <Label>Thumbnail Image</Label>
            <Controller
              control={control}
              name={"thumbnail_url"}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              )}
            />

            <Label>Cover Image</Label>
            <Controller
              control={control}
              name={"cover_url"}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              )}
            />
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
                    placeholder={"Enter Campaign Name"}
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
          </div>

          <p className="font-medium my-2">Campaign Information</p>

          <div className="border p-3 rounded-md bg-slate-50">
            <div className="flex flex-col mt-2">
              <Label className="my-1">Campaign Type</Label>
              <Controller
                control={control}
                name={"campaign_type"}
                rules={{ required: false }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Cascader
                    size={"large"}
                    placeholder={"Select type of offer"}
                    className="relative w-full"
                    allowClear={false}
                    value={value}
                    showSearch
                    options={campaignTypeData}
                    onChange={(v) => onChange(v?.[0])}
                    onBlur={onBlur}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="mt-2">
                <Label isRequired className="my-1">
                  Amount Type
                </Label>
                <Controller
                  control={control}
                  name={"amount_type"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Cascader
                      size={"large"}
                      placeholder={"Select type of offer"}
                      className="relative w-full"
                      allowClear={false}
                      value={value}
                      showSearch
                      options={typeData}
                      onChange={(v) => onChange(v?.[0])}
                      onBlur={onBlur}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <div className="mt-2">
                <Label isRequired className="my-1">
                  Amount
                </Label>
                <Controller
                  control={control}
                  name={"amount"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      size={"large"}
                      placeholder={"Enter an amount"}
                      className="w-full"
                      allowClear={false}
                      value={value}
                      prefix={
                        watch("amount_type") === "percentage" ? (
                          <Icon
                            className="text-2xl text-text-light mr-2"
                            icon={"mdi:percent-box"}
                          />
                        ) : watch("amount_type") === "amount" ? (
                          <Icon
                            className="text-2xl text-text-light mr-2"
                            icon={"tabler:currency-taka"}
                          />
                        ) : (
                          ""
                        )
                      }
                      onChange={onChange}
                      onBlur={onBlur}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="mt-2">
                <Label className="my-1">Publish Date </Label>
                <Controller
                  control={control}
                  name={"publish_date"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      size="large"
                      className={"w-full"}
                      allowClear
                      placeholder="Publish Date"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ? moment(value) : null}
                    />
                  )}
                />
              </div>
              {/* <div className="mt-2">
              <Label className="my-1">Publish Date </Label>
              <Controller
                control={control}
                name={"publish_date"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <DatePicker.RangePicker
                    bordered={true}
                    size={"large"}
                    allowClear={false}
                    allowEmpty={[false, false]}
                    className="w-fit min-w-[250px]"
                    presets={[
                      {
                        label: "Today",
                        value: [moment(), moment()],
                      },
                      {
                        label: "Yesterday",
                        value: [
                          moment().add(-1, "days"),
                          moment().add(-1, "days"),
                        ],
                      },
                      {
                        label: "Last 7 Days",
                        value: [moment().add(-7, "days"), moment()],
                      },
                      {
                        label: "Last 30 Days",
                        value: [moment().add(-30, "days"), moment()],
                      },
                      {
                        label: "Last 6 Months",
                        value: [moment().add(-3, "months"), moment()],
                      },
                      {
                        label: "Last 1 Year",
                        value: [moment().add(-1, "year"), moment()],
                      },
                    ]}
                    value={watch("range") as any}
                    onBlur={onBlur}
                    onChange={(v) => {
                      setDateRange("range", v || [null, null]);
                    }}
                  />
                )}
              />
            </div> */}
            </div>
          </div>

          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isCampaignUpdating}
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
