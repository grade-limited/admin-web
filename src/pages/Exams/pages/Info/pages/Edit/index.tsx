import { useGetExamsById, useUpdateExamsById } from "@/queries/exams";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Checkbox, DatePicker, Input, Select, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import moment from "moment";
import Iconify from "@components/iconify";
import * as dayjs from "dayjs";
import useQsnBank from "@/hooks/useQsnBank";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetExamsById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [examInfo, setExamInfo] = React.useState<any>([]);
  const { qsnBank, isQsnBankLoading, searchQsnBank } = useQsnBank();

  // const { chapter, isChapterLoading, searchChapter } = useChapter();
  const { mutateAsync: update, isLoading: isExamUpdating } =
    useUpdateExamsById();

  React.useEffect(() => {
    if (!data) return;
    setExamInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!examInfo || isDirty) return;
    reset({
      name: examInfo?.name,
      description: examInfo?.description,
      duration: examInfo?.duration,
      negative_mark: examInfo?.negative_mark,
      type: examInfo?.type,
      attendee_type: examInfo?.attendee_type,
      is_archivable: examInfo?.is_archivable,
      live_datetime: examInfo?.live_datetime,
      question_bank_id: examInfo?.question_bank_id,
    });
  }, [examInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Exam..",
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
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 px-4 rounded-3xl max-w-xl mb-4 mx-auto">
          {/* <Avatar
            className="rounded-2xl w-32 h-32 aspect-square"
            variant="square"
            src={previewAttachment(data?.display_picture)}
            alt={data?.name}
            {...stringAvatar(data?.name)}
          /> */}
          <div>
            <p className="text-2xl font-bold flex flex-row items-center">
              {data?.name}
            </p>
            <p className="text-text-light whitespace-pre-wrap">
              {data?.description || " "}
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
          <p className="font-medium mb-2">Exam Information</p>
          <div className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50">
            <div>
              <Label className="my-1">Question Bank</Label>
              <Controller
                control={control}
                name={"question_bank_id"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Select
                    value={value}
                    size="large"
                    allowClear
                    showSearch
                    className="w-full"
                    placeholder={"Select a Chapter..."}
                    suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                    onChange={onChange}
                    options={qsnBank}
                    onSearch={searchQsnBank}
                    loading={isQsnBankLoading}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
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
                  className="relative w-full"
                  placeholder={"Enter Exam Name"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
            <Label>Description</Label>
            <Controller
              control={control}
              name={"description"}
              // rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  className="relative w-full"
                  placeholder={"Enter a Description"}
                  size={"large"}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  status={error ? "error" : ""}
                  //   suffix={<ErrorSuffix error={error} />}
                />
              )}
            />
            <div className="flex flex-row gap-4">
              <div className="flex flex-col w-full gap-2">
                <Label>Duration</Label>
                <Controller
                  control={control}
                  name={"duration"}
                  // rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      className="relative w-full"
                      placeholder={"Enter Exam Duration"}
                      size={"large"}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                      addonAfter={"min"}
                      //   suffix={<ErrorSuffix error={error} />}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Negative Mark</Label>
                <Controller
                  control={control}
                  name={"negative_mark"}
                  // rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      className="relative w-full"
                      placeholder={"Negative Marking"}
                      size={"large"}
                      onChange={onChange}
                      onBlur={onBlur}
                      addonAfter={<>&times; (-1)</>}
                      value={value}
                      status={error ? "error" : ""}
                      //   suffix={<ErrorSuffix error={error} />}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col w-full gap-2">
                <Label className="my-1">Exam Type</Label>
                <Controller
                  control={control}
                  name={"type"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      value={value}
                      allowClear
                      size="large"
                      className="w-full"
                      placeholder={"Select a Exam Type..."}
                      onChange={onChange}
                      options={[
                        { value: "model", label: "Model" },
                        { value: "quick", label: "Quick" },
                        { value: "mock", label: "Mock" },
                      ]}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label className="my-1">Attendee Type</Label>
                <Controller
                  control={control}
                  name={"attendee_type"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      value={value}
                      size="large"
                      className="w-full"
                      allowClear
                      placeholder={"Select Attendancce Type..."}
                      onChange={onChange}
                      options={[
                        { value: "premium", label: "Premium" },
                        { value: "free ", label: "Free" },
                      ]}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label className="my-1">Exam Live Date</Label>
              <Controller
                control={control}
                name={"live_datetime"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    showTime
                    size="large"
                    className={"w-full"}
                    allowClear
                    placeholder="Exam Live Date "
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ? dayjs(value) : null}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name={"is_archivable"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Checkbox
                  onChange={onChange}
                  checked={value}
                  className="py-3 px-3"
                >
                  Archive after live exam
                </Checkbox>
              )}
            />
          </div>
          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isExamUpdating}
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
