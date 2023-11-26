import React from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Divider, Input } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateBrand } from "@/queries/brands";

const Create: React.FC = () => {
  const { handleSubmit, control, reset } = useForm({
    // resolver: joiResolver(loginResolver),
  });
  const { mutateAsync: create, isLoading: brandCreating } = useCreateBrand();

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Brands..",
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
        <p className="text-lg font-medium mb-2">Create New Brand</p>

        <Link
          to={"/app/brands/list"}
          className="text-sm font-medium text-text underline"
        >
          <p className="mt-3">View All Brands</p>
        </Link>
        <Divider />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
      >
        <p className="font-medium mb-2">Brand Information</p>
        <div className="border p-3 rounded-md bg-slate-50">
          <div>
            <Label className="my-1">Brand Name</Label>
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

        <Button
          variant="contained"
          size="large"
          type={"submit"}
          className="w-full mt-4"
          disabled={brandCreating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
