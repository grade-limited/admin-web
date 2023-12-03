import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import {
  Divider,
  Input,
  Upload as AntUpload,
  Button as AntButton,
  Cascader,
} from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateCampaign } from "@/queries/campaigns";
import previewAttachment from "@/utilities/s3Attachment";
import instance from "@/services";
import { Icon } from "@iconify/react";
import { IOption } from "@/queries/organizations/type";
import DatePicker from "@components/antd/DatePicker";
import moment from "moment";

const Create: React.FC = () => {
  const { handleSubmit, control, reset, watch } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: create, isLoading: campaignCreating } =
    useCreateCampaign();
  const [messageApi, contextHolder] = message.useMessage();
  // const [dateRange, setDateRange] = React.useState([null, null]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Campaigns..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        create({
          ...data,
          isActive: true,
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
    <div>
      {contextHolder}
      <div className="max-w-md mt-6 mx-auto text-center">
        <p className="text-lg font-medium mb-2">Create New Campaign</p>

        <Link
          to={"/app/campaigns/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Campaigns</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Basic Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <div className="flex flex-row items-center gap-10">
            <span>
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
            </span>
            <span>
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
            </span>
          </div>
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
                  allowClear={true}
                  allowEmpty={[true, true]}
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
          disabled={campaignCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
