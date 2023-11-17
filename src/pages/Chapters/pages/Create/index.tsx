import React from "react";
import { useCreateChapters } from "@/queries/chapters";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Divider, Input, Select } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "@components/iconify";
import useSubject from "@/hooks/useSubject";

const Create: React.FC = () => {
  // Get Subject
  const { subject, isSubjectLoading, searchSubject } = useSubject();
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: create, isLoading: chapterCreating } =
    useCreateChapters();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Chapter..",
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
        <p className="text-lg font-medium mb-2">Create New Chapter</p>
        <p className="text-sm text-text-light">
          Initiate a new chapter creation process. Input chapter title, content,
          and preferences efficiently, empowering you to curate and organize
          your content effectively on this page.
        </p>
        <Link
          to={"/app/chapters/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Chapters</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50">
          <div>
            <Label className="my-1">Subject</Label>
            <Controller
              control={control}
              name={"subject_id"}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Select
                  value={value}
                  size="large"
                  showSearch
                  className="w-full"
                  placeholder={"Select a Subject..."}
                  suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
                  onChange={onChange}
                  options={subject}
                  onSearch={searchSubject}
                  loading={isSubjectLoading}
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
                placeholder={"Enter Subject Name"}
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
          disabled={chapterCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
