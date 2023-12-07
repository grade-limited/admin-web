import React from "react";
import { Alert, Button } from "antd";
import { useDeleteBrand, useGetBrandsById } from "@/queries/brands";
import { useParams } from "react-router-dom";
import moment from "moment";
import { IBrandId } from "@/types";
import { message } from "@components/antd/message";
import handleResponse from "@/utilities/handleResponse";

const TrashAlert: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBrandsById(id);

  const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteBrand();
  const onDelete = async (
    id: IBrandId,
    permanent: Boolean = false,
    restore: Boolean = false
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Brand Permanently.."
        : restore
        ? "Restoring Brand.."
        : "Deleting Brand..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      Delete({
        id,
        params: {
          permanent,
          restore,
        },
      })
    );

    message.destroy();

    if (res.status) {
      message.success(res.message);
      return true;
    } else {
      message.error(res.message);
      return false;
    }
  };
  if (isLoading || data?.deleted_at === null) return null;

  return (
    <>
      <Alert
        message={
          <>
            <b>{data?.name}</b> was deleted at{" "}
            <b>{moment(data?.deleted_at).format("lll")}</b>.
          </>
        }
        type="warning"
        showIcon
        className="mb-2 mx-auto max-w-3xl"
        action={
          <Button
            size="small"
            type="text"
            onClick={() => onDelete(id, false, true)}
            disabled={isDeleteLoading}
          >
            Restore
          </Button>
        }
      />
    </>
  );
};

export default TrashAlert;
