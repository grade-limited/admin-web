import React from "react";
import { useCreateTopics } from "@/queries/topics";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Divider, Input, Select } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "@components/iconify";
import useChapter from "@/hooks/useChapter";

const Create: React.FC = () => {
  // Get Subject
  const { chapter, isChapterLoading, searchChapter } = useChapter();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: create, isLoading: topicCreating } = useCreateTopics();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Topic..",
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
        <p className="text-lg font-medium mb-2">Create New Topic</p>
        <p className="text-sm text-text-light">
          Initiate a new topic creation process. Input topic title, content, and
          preferences efficiently, empowering you to curate and organize your
          content effectively on this page.
        </p>
        <Link
          to={"/app/topics/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Topics</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50">
          <div>
            <Label className="my-1">Chapter</Label>
            <Controller
              control={control}
              name={"chapter_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Select
                  value={value}
                  size="large"
                  showSearch
                  className="w-full"
                  placeholder={"Select a Chapter..."}
                  suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                  onChange={onChange}
                  options={chapter}
                  onSearch={searchChapter}
                  loading={isChapterLoading}
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
                placeholder={"Enter Topic Name"}
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
        </div>

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4"
          disabled={topicCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
