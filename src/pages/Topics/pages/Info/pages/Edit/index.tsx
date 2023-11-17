import { useGetTopicsById, useUpdateTopicsById } from "@/queries/topics";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Input, Select, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import moment from "moment";
import useChapter from "@/hooks/useChapter";
import Iconify from "@components/iconify";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetTopicsById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [topicInfo, setTopicInfo] = React.useState<any>([]);
  const { chapter, isChapterLoading, searchChapter } = useChapter();
  const { mutateAsync: update, isLoading: isTopicUpdating } =
    useUpdateTopicsById();

  React.useEffect(() => {
    if (!data) return;
    setTopicInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!topicInfo || isDirty) return;
    reset({
      name: topicInfo?.name,
      chapter_id: topicInfo?.chapter_id,
      description: topicInfo?.description,
      cover_picture: topicInfo?.cover_picture,
    });
  }, [topicInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Topic..",
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
        <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-slate-200 p-3 rounded-3xl max-w-xl mb-4 mx-auto">
          <Avatar
            className="rounded-2xl w-32 h-32 aspect-square"
            variant="square"
            src={previewAttachment(data?.display_picture)}
            alt={data?.name}
            {...stringAvatar(data?.name)}
          />
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
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
          <p className="font-medium mb-2">Topic Information</p>
          <div className="flex flex-col gap-2 border p-3 rounded-md bg-slate-50">
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
                  className="w-full"
                  placeholder={"Enter First Name"}
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
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input.TextArea
                  className="w-full"
                  placeholder={"Enter Last Name"}
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
          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isTopicUpdating}
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
