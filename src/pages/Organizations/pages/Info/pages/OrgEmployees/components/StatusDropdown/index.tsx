import { IOption } from "@/hooks/useRole/types";
import { useUpdateEmployeeshipById } from "@/queries/employeeship";
import handleResponse from "@/utilities/handleResponse";
import { Select, message } from "antd";
import React from "react";

const StatusDropdown: React.FC<{
  params: any;
  is_kam?: boolean;
}> = ({ params, is_kam = false }) => {
  const { mutateAsync: update } = useUpdateEmployeeshipById();

  const [status, setStatus] = React.useState<any>(
    params?.row?.employeeship_status
  );

  const onSubmit = async (id: any, data: any) => {
    message.open({
      type: "loading",
      content: "Updating Status..",
      duration: 0,
    });
    const res = await handleResponse(() => update({ id, data }));
    message.destroy();
    if (res.status) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  const statusData: IOption[] = [
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "confirmed",
      label: "Confirmed",
    },
    {
      value: "declined",
      label: "Declined",
    },
  ];

  return (
    <>
      {is_kam ? (
        <>
          <div>
            <Select
              size={"large"}
              placeholder={"Update KAM Status"}
              className="w-full"
              bordered={false}
              value={params?.row?.is_kam}
              options={[
                {
                  value: true,
                  label: "Admin",
                },
                {
                  value: false,
                  label: "Employee",
                },
              ]}
              onChange={(v) => {
                onSubmit(params?.row?.id, { is_kam: v });
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Select
              size={"large"}
              placeholder={"Select Status"}
              className="w-full"
              bordered={false}
              value={status}
              // disabled={status === "pending" ? false : true}
              options={statusData}
              onChange={(v) => {
                onSubmit(params?.row?.id, { employeeship_status: v });
                setStatus(v);
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default StatusDropdown;
