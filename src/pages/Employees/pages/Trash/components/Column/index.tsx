import { useDeleteEmployee, useSuspendEmployee } from "@/queries/employees";
import { IEmployeeId } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const Column = (): GridColDef[] => {
  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteEmployee();

  const onDelete = async (
    id: IEmployeeId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Employee Permanently.."
        : restore
        ? "Restoring Employee.."
        : "Deleting Employee..",
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
    useSuspendEmployee();

  const onSuspend = async (id: IEmployeeId) => {
    message.open({
      type: "loading",
      content: "Suspending Employee..",
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
      width: 200,
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      headerName: "Role",
      headerAlign: "center",
      field: "role",
      align: "center",
      width: 200,
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return params?.value?.name ? `${params.value.name}` : "-";
      },
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
      headerName: "Deleted At",
      headerAlign: "center",
      field: "deleted_at",
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
            <Link to={`/app/employees/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/employees/i/${params.id}/edit`}>
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
          label={
            params.row.is_active ? "Suspend Employee" : "Activate Employee"
          }
          onClick={() => onSuspend(params.id)}
        />,
        <GridActionsCellItem
          icon={
            <Iconify icon={"ic:twotone-restore-page"} className="text-lg" />
          }
          disabled={isDeleteLoading}
          showInMenu
          label="Restore"
          onClick={() => onDelete(params.id, null, true)}
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
