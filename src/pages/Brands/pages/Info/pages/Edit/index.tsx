import { useGetBrandsById, useUpdateBrandsById } from "@/queries/brands";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Input, Spin, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import previewAttachment from "@/utilities/s3Attachment";
import { stringAvatar } from "@/utilities/stringAvatar";
import moment from "moment";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBrandsById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const [brandInfo, setBrandInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isBrandUpdating } =
    useUpdateBrandsById();

  React.useEffect(() => {
    if (!data) return;
    setBrandInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!brandInfo || isDirty) return;
    reset({
      name: brandInfo?.name,
      description: brandInfo?.description,
    });
  }, [brandInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Brand..",
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
            alt={[data?.first_name, data?.last_name].join(" ")}
            {...stringAvatar([data?.first_name, data?.last_name].join(" "))}
          />
          <div>
            <p className="text-2xl font-bold flex flex-row items-center gap-2">
              {data?.name}
            </p>
            <p className="text-text-light font-semibold">
              {data?.description || "-"}
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
          <p className="font-medium mb-2">Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div>
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
                    placeholder={"Enter Brand Name"}
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
              <Label isRequired>Description</Label>
              <Controller
                control={control}
                name={"description"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    placeholder={"Enter Description of the Brand"}
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
          </div>

          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isBrandUpdating}
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
