import { useDeleteQsnBank } from "@/queries/qsnbank";
import { IQsnBankId } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const Column = (): GridColDef[] => {
  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteQsnBank();

  const onDelete = async (
    id: IQsnBankId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Question Bank Permanently.."
        : restore
        ? "Restoring Question Bank.."
        : "Deleting Question Bank..",
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

  return [
    {
      headerName: "ID",
      headerAlign: "center",
      field: "id",
      align: "center",
      width: 60,
      minWidth: 50,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Title",
      headerAlign: "center",
      field: "name",
      align: "center",
      flex: 1,
      width: 180,
      minWidth: 150,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Description",
      headerAlign: "center",
      field: "description",
      align: "center",
      width: 280,
      minWidth: 250,
      flex: 1,
      filterable: false,
      sortable: false,
    },

    {
      headerName: "Created At",
      headerAlign: "center",
      field: "created_at",
      align: "center",
      width: 220,
      minWidth: 200,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return moment(params.value).format("lll");
      },
    },
    {
      field: "actions",
      type: "actions",
      minWidth: 200,
      getActions: (params) => [
        <GridActionsCellItem
          disableRipple
          disableTouchRipple
          disableFocusRipple
          className="hover: bg-transparent"
          icon={
            <Link to={`/app/qb/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/qb/i/${params.id}/edit`}>
              <Iconify icon={"fluent:edit-12-regular"} className="text-lg" />
            </Link>
          }
          label="Edit"
        />,

        <GridActionsCellItem
          icon={
            <Iconify icon={"icon-park-twotone:delete"} className="text-lg" />
          }
          disabled={isDeleteLoading}
          showInMenu
          label="Delete"
          onClick={() => onDelete(params.id)}
        />,
        <GridActionsCellItem
          icon={
            <Iconify
              icon={"icon-park-twotone:delete-five"}
              className="text-lg"
            />
          }
          disabled={isDeleteLoading}
          showInMenu
          label="Permanently Delete"
          onClick={() => onDelete(params.id, true)}
        />,
      ],
    },
  ];
};

export default Column;
