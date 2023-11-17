import React from "react";
import { useCreateExams } from "@/queries/exams";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Checkbox, DatePicker, Divider, Input, Select } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "@components/iconify";
import useQsnBank from "@/hooks/useQsnBank";
import * as dayjs from "dayjs";

const Create: React.FC = () => {
  // Get Subject
  const { qsnBank, isQsnBankLoading, searchQsnBank } = useQsnBank();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: create, isLoading: examCreating } = useCreateExams();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Exam..",
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
        <p className="text-lg font-medium mb-2">Create New Exam</p>
        <p className="text-sm text-text-light">
          Effortlessly launch a new exam. Configure settings, select questions,
          and define grading criteria with ease, streamlining the exam creation
          process on this dedicated page.
        </p>
        <Link
          to={"/app/exams/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Exams</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
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

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4"
          disabled={examCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
