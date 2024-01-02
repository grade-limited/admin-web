import { useDeleteEmployeeship } from "@/queries/employeeship";
import { IEmployeeshipId } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import StatusDropdown from "../StatusDropdown";

const Column = (): GridColDef[] => {
  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteEmployeeship();
  const onDelete = async (
    id: IEmployeeshipId,
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

  // const { mutateAsync: Suspend, isLoading: isSuspendLoading } =
  //   useSuspendEmployee();

  // const onSuspend = async (id: IEmployeeshipId) => {
  //   message.open({
  //     type: "loading",
  //     content: "Suspending Employee..",
  //     duration: 0,
  //   });
  //   const res = await handleResponse(() =>
  //     Suspend({
  //       id,
  //     })
  //   );

  //   message.destroy();

  //   if (res.status) {
  //     message.success(res.message);
  //     return true;
  //   } else {
  //     message.error(res.message);
  //     return false;
  //   }
  // };

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
      headerName: "Name",
      headerAlign: "center",
      field: "name",
      align: "center",
      minWidth: 200,
      flex: 1,
      filterable: false,
      sortable: false,
      valueGetter(params) {
        return (
          [params?.row?.user?.first_name, params?.row?.user?.last_name].join(
            " "
          ) || "-"
        );
      },
    },
    {
      headerName: "Employee ID",
      headerAlign: "center",
      field: "employee_id",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.employee_id ? <p>{data?.row?.employee_id}</p> : "-",
    },
    {
      headerName: "Designation",
      headerAlign: "center",
      field: "designation",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.designation ? <p>{data?.row?.designation}</p> : "-",
    },
    {
      headerName: "Depertment",
      headerAlign: "center",
      field: "depertment",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.depertment ? <p>{data?.row?.depertment}</p> : "-",
    },
    {
      headerName: "Unit",
      headerAlign: "center",
      field: "business_unit",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.business_unit ? <p>{data?.row?.business_unit}</p> : "-",
    },
    {
      headerName: "Desk Info",
      headerAlign: "center",
      field: "desk_info",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.desk_info ? <p>{data?.row?.desk_info}</p> : "-",
    },
    {
      headerName: "Permission",
      headerAlign: "center",
      field: "is_kam",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (params: any) => [
        <StatusDropdown key={params?.id} params={params} is_kam={true} />,
      ],
      //
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "employeeship_status",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (params: any) => [
        <StatusDropdown key={params?.id} params={params} />,
      ],
    },
    {
      headerName: "Created At",
      headerAlign: "center",
      field: "created_at",
      align: "center",
      flex: 1,
      width: 200,
      minWidth: 180,
      filterable: false,
      sortable: false,
      valueFormatter(params) {
        return moment(params.value).format("lll");
      },
    },
    {
      headerName: "Updated At",
      headerAlign: "center",
      field: "updated_at",
      align: "center",
      flex: 1,
      width: 200,
      minWidth: 180,
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
            <Link to={`/app/employeeship/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/employeeship/i/${params.id}/edit`}>
              <Iconify icon={"fluent:edit-12-regular"} className="text-lg" />
            </Link>
          }
          label="Edit"
        />,
        // <GridActionsCellItem
        //   icon={
        //     params.row.is_active ? (
        //       <Iconify icon={"lucide:shield-ban"} className="text-lg" />
        //     ) : (
        //       <Iconify icon={"tabler:shield-up"} className="text-lg" />
        //     )
        //   }
        //   disabled={isSuspendLoading}
        //   showInMenu
        //   label={
        //     params.row.is_active ? "Suspend Employee" : "Activate Employee"
        //   }
        //   onClick={() => onSuspend(params.id)}
        // />,
        // <GridActionsCellItem
        //   icon={
        //     <Iconify icon={"icon-park-twotone:delete"} className="text-lg" />
        //   }
        //   disabled={isDeleteLoading}
        //   showInMenu
        //   label="Delete"
        //   onClick={() => onDelete(params.id)}
        // />,
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
