import React from "react";
import { useCreateQuestions } from "@/queries/questions";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Divider, Input, Select } from "antd";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useTopic from "@/hooks/useTopic";
import useExam from "@/hooks/useExam";
import Iconify from "@components/iconify";

const Create: React.FC = () => {
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const navigate = useNavigate();
  const { exam, isExamLoading, searchExam } = useExam();
  const { topic, isTopicLoading, searchTopic } = useTopic();
  console.log(topic);

  const { mutateAsync: create, isLoading: questionCreating } =
    useCreateQuestions();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Question..",
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
      navigate(`/app/questions/i/${res?.data?.id}/edit`);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div>
      <div className="max-w-md mt-6 mx-auto text-center">
        <p className="text-lg font-medium mb-2">Create New Question</p>
        <p className="text-sm text-text-light">
          Create questions with ease. Input prompts, answers, and details
          effortlessly, simplifying the process of adding and organizing
          questions on this dedicated creation page.
        </p>
        <Link
          to={"/app/questions/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Questions</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50">
          <Label isRequired>Question</Label>
          <Controller
            control={control}
            name={"question"}
            rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input
                className="relative w-full"
                placeholder={"Enter Question Name"}
                size={"large"}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                //   suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Label className="my-1">Question Type</Label>
          <Controller
            control={control}
            name={"type"}
            defaultValue={"MCQ"}
            // rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Select
                placeholder={"Question Type"}
                size={"large"}
                className="relative w-full"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={[
                  { value: "MCQ", label: "MCQ" },
                  { value: "WRITTEN ", label: "WRITTEN " },
                ]}
              />
            )}
          />
          <Label>Explaination</Label>
          <Controller
            control={control}
            name={"explaination"}
            // rules={{ required: true }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Input.TextArea
                className="relative w-full"
                placeholder={"Enter an Explaination to the Question"}
                size={"large"}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? "error" : ""}
                //   suffix={<ErrorSuffix error={error} />}
              />
            )}
          />
          <Label className="my-1">Topic</Label>
          <Controller
            control={control}
            name={"topic_id"}
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
                placeholder={"Select a Subject..."}
                suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                onChange={onChange}
                options={topic}
                onSearch={searchTopic}
                loading={isTopicLoading}
                status={error ? "error" : ""}
              />
            )}
          />
          <Label className="my-1">Exam</Label>
          <Controller
            control={control}
            name={"exam_id"}
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
                placeholder={"Select a Exam..."}
                suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                onChange={onChange}
                options={exam}
                onSearch={searchExam}
                loading={isExamLoading}
                status={error ? "error" : ""}
              />
            )}
          />
        </div>

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4"
          disabled={questionCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
