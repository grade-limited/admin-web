import {
  useGetQuestionsById,
  useUpdateQuestionsById,
} from "@/queries/questions";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Input, Select, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import moment from "moment";
import Iconify from "@components/iconify";
import useExam from "@/hooks/useExam";
import useTopic from "@/hooks/useTopic";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetQuestionsById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [questionInfo, setQuestionInfo] = React.useState<any>([]);
  const { exam, isExamLoading, searchExam } = useExam();
  const { topic, isTopicLoading, searchTopic } = useTopic();
  const { mutateAsync: update, isLoading: isQuestionUpdating } =
    useUpdateQuestionsById();

  React.useEffect(() => {
    if (!data) return;
    setQuestionInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!questionInfo || isDirty) return;
    reset({
      question: questionInfo?.question,
      explaination: questionInfo?.explaination,
      type: questionInfo?.type,
      topic_id: questionInfo?.topic_id,
      exam_id: questionInfo?.exam_id,
    });
  }, [questionInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Question..",
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
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto px-6">
          {/* <Avatar
            className="rounded-2xl w-32 h-32 aspect-square"
            variant="square"
            src={previewAttachment(data?.display_picture)}
            alt={data?.name}
            {...stringAvatar(data?.name)}
          /> */}
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2 ">
              {data?.question}
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
          <p className="font-medium mb-2">Question Information</p>
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
          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isQuestionUpdating}
            >
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </Spin>
  );
};
//something
export default Edit;
