import { useDeleteQuotations } from "@/queries/quotations";
import { IOrderId } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import Iconify from "@components/iconify";
import { Chip } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const Column = (): GridColDef[] => {
  const { mutateAsync: Delete, isLoading: isDeleteLoading } =
    useDeleteQuotations();

  const onDelete = async (
    id: IOrderId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Order Permanently.."
        : restore
        ? "Restoring Order.."
        : "Deleting Order..",
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

  // const onSuspend = async (id: IQuotationsId) => {
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
      headerName: "Username",
      headerAlign: "center",
      field: "user",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.user ? (
          <Link to={`/app/users/i/${data?.row?.user?.id}`}>
            <Chip
              label={[
                data?.row?.user?.first_name,
                data?.row?.user?.last_name,
              ].join(" ")}
            />
          </Link>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Name",
      headerAlign: "center",
      field: "contact_name",
      align: "center",
      minWidth: 200,
      flex: 1,
      filterable: false,
      sortable: false,
      // valueGetter(params) {
      //   return (
      //     [params?.row?.name, params?.row?.last_name].join(" ") || "-"
      //   );
      // },
    },
    {
      headerName: "Contact Number",
      headerAlign: "center",
      field: "contact_number",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_number ? <p>{data?.row?.contact_number}</p> : "-",
    },

    {
      headerName: "Contact Email",
      headerAlign: "center",
      field: "contact_email",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_email ? <p>{data?.row?.contact_email}</p> : "-",
    },
    {
      headerName: "Contact Designation",
      headerAlign: "center",
      field: "contact_designation",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.recipient_address ? (
          <p>{data?.row?.contact_designation}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "status",
      align: "center",
      flex: 1,
      minWidth: 180,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.status ? <Chip label={data?.row?.status} /> : "-",
    },
    {
      headerName: "Created At",
      headerAlign: "center",
      field: "created_at",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.created_at
          ? moment(data?.row?.created_at).format("ll")
          : "-",
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
      renderCell: (data: any) =>
        data?.row?.created_at
          ? moment(data?.row?.updated_at).format("ll")
          : "-",
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
            <Link to={`/app/quotations/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        // <GridActionsCellItem
        //   icon={
        //     <Link to={`/app/quotations/i/${params.id}/edit`}>
        //       <Iconify icon={"fluent:edit-12-regular"} className="text-lg" />
        //     </Link>
        //   }
        //   label="Edit"
        // />,
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
