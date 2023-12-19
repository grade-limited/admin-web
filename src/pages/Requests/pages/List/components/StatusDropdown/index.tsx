import { IOption } from "@/hooks/useRole/types";
import { useUpdateRequestsById } from "@/queries/requests";
import handleResponse from "@/utilities/handleResponse";
import Iconify from "@components/iconify";
import { Dialog } from "@mui/material";
import { useToggle } from "@tam11a/react-use-hooks";
import { Select, message } from "antd";
import React from "react";

const StatusDropdown: React.FC<any> = (params) => {
  const { mutateAsync: update } = useUpdateRequestsById();
  const [status, setStatus] = React.useState<any>(params?.row?.request_status);
  const { state: open, toggleState: onClose } = useToggle();

  const onSubmit = async (id: any, data: any) => {
    message.open({
      type: "loading",
      content: "Updating Quotation..",
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
      value: "in progress",
      label: "In progress",
    },
    {
      value: "approved",
      label: "Approved",
    },

    {
      value: "declined",
      label: "Declined",
    },
  ];
  const steps = [
    {
      title: "Details",
      description: "Information",
      content: <></>,
      icon: <Iconify icon="gg:organisation" />,
    },
    {
      title: "Type",
      description: "Type/Sub-type",
      content: <></>,
      icon: <Iconify icon="fluent-mdl2:org" />,
    },
  ];
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          className: "w-full max-w-3xl rounded-lg",
        }}
      ></Dialog>
      <Select
        size={"large"}
        placeholder={"Select Status"}
        className="w-full"
        bordered={false}
        value={status}
        options={statusData}
        onChange={(v) => {
          if (v === "approved") {
            onClose();
          } else {
            onSubmit(params?.row?.id, { request_status: v });
            setStatus(v);
          }
        }}
      />
    </div>
  );
};

export default StatusDropdown;
