import Iconify from "@components/iconify";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import { useDeleteUser, useSuspendUser } from "@/queries/users";
import { IUserId } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";

const UserColumn = (): GridColDef[] => {
  const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteUser();

  const onDelete = async (
    id: IUserId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting User Permanently.."
        : restore
        ? "Restoring User.."
        : "Deleting User..",
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

  const { mutateAsync: Suspend, isLoading: isSuspendLoading } =
    useSuspendUser();

  const onSuspend = async (id: IUserId) => {
    message.open({
      type: "loading",
      content: "Suspending User..",
      duration: 0,
    });
    const res = await handleResponse(() =>
      Suspend({
        id,
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
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Title",
      headerAlign: "center",
      field: "first_name",
      align: "center",
      minWidth: 250,
      flex: 1,
      filterable: false,
      sortable: false,
      valueGetter(params) {
        return (
          [params?.row?.first_name, params?.row?.last_name].join(" ") || "-"
        );
      },
    },
    {
      headerName: "Username",
      headerAlign: "center",
      field: "username",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return `@${params.value}`;
      },
    },
    {
      headerName: "Gender",
      headerAlign: "center",
      field: "gender",
      align: "center",
      width: 120,
      minWidth: 120,
      flex: 1,
      sortable: false,
    },
    {
      headerName: "Phone",
      headerAlign: "center",
      field: "phone",
      align: "center",
      width: 100,
      minWidth: 80,
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Email",
      headerAlign: "center",
      field: "email",
      align: "center",
      width: 250,
      minWidth: 200,
      //   flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Verified At",
      headerAlign: "center",
      field: "verified_at",
      align: "center",
      flex: 1,
      width: 280,
      minWidth: 250,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return params.value ? moment(params.value).format("lll") : "-";
      },
    },
    {
      headerName: "Created At",
      headerAlign: "center",
      field: "created_at",
      align: "center",
      flex: 1,
      width: 280,
      minWidth: 250,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return moment(params.value).format("lll");
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      minWidth: 160,
      getActions: (params) => [
        <GridActionsCellItem
          disableRipple
          disableTouchRipple
          disableFocusRipple
          className="hover: bg-transparent"
          icon={
            <Link to={`/app/users/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/users/i/${params.id}/edit`}>
              <Iconify icon={"fluent:edit-12-regular"} className="text-lg" />
            </Link>
          }
          label="Edit"
        />,
        <GridActionsCellItem
          icon={
            params.row.is_active ? (
              <Iconify icon={"lucide:shield-ban"} className="text-lg" />
            ) : (
              <Iconify icon={"tabler:shield-up"} className="text-lg" />
            )
          }
          disabled={isSuspendLoading}
          showInMenu
          label={params.row.is_active ? "Suspend User" : "Activate User"}
          onClick={() => onSuspend(params.id)}
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

export default UserColumn;
