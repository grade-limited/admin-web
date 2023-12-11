import { useGetOrdersById, useUpdateOrdersById } from "@/queries/orders";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Input, Spin, message, Cascader } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import moment from "moment";
import ErrorSuffix from "@components/antd/ErrorSuffix";
import { IOption } from "@/hooks/useRole/types";
import DatePicker from "@components/antd/DatePicker";
// import { joiResolver } from "@hookform/resolvers/joi";
// import { orderUpdateResolver } from "./resolver";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetOrdersById(id);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm({
    // resolver: joiResolver(orderUpdateResolver),
  });
  const [orderInfo, setOrderInfo] = React.useState<any>([]);
  const { mutateAsync: update, isLoading: isOrderUpdating } =
    useUpdateOrdersById();

  React.useEffect(() => {
    if (!data) return;
    setOrderInfo(data);
  }, [data]);

  React.useEffect(() => {
    if (!orderInfo || isDirty) return;
    reset({
      status: orderInfo?.status,
      expected_delivery_date: orderInfo?.expected_delivery_date,
      delivery_fee: orderInfo?.delivery_fee,
      discount: orderInfo?.discount,
    });
  }, [orderInfo]);

  // On Submit Function
  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Order..",
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
  const statusData: IOption[] = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Accepted",
      label: "Accepted",
    },
    {
      value: "Processing",
      label: "Processing",
    },
    {
      value: "Delivered",
      label: "Delivered",
    },
    {
      value: "Declined",
      label: "Declined",
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
        >
          <p className="font-medium mb-2">Information</p>
          <div className="border p-3 rounded-md bg-slate-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Controller
                  control={control}
                  name={"status"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Order Status
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Cascader
                        size={"large"}
                        placeholder={"Select Status"}
                        className="relative w-full"
                        allowClear={true}
                        value={value}
                        showSearch
                        options={statusData}
                        onChange={(v) => onChange(v?.[0])}
                        onBlur={onBlur}
                        status={error ? "error" : ""}
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name={"expected_delivery_date"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Description
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <DatePicker
                        size="large"
                        className={"w-full"}
                        allowClear
                        placeholder="Expected Delivery Date"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value ? moment(value) : null}
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <Controller
                  control={control}
                  name={"delivery_fee"}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Delivery Fee
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter an Amount"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name={"discount"}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Label className="my-2">
                        Discount
                        <ErrorSuffix error={error} size="small" />
                      </Label>
                      <Input
                        placeholder={"Enter an Amount"}
                        size={"large"}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? "error" : ""}
                        //   suffix={<ErrorSuffix error={error} />}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          {isDirty && (
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              className="w-full mt-4"
              disabled={isOrderUpdating}
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
