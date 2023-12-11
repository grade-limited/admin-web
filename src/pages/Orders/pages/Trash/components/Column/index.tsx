import {
  useDeleteOrders,
  // useSuspendOrders
} from "@/queries/orders";
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
  const { mutateAsync: Delete, isLoading: isDeleteLoading } = useDeleteOrders();

  const onDelete = async (
    id: IOrderId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Orders Permanently.."
        : restore
        ? "Restoring Orders.."
        : "Deleting Orders..",
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
  //   useSuspendOrders();

  // const onSuspend = async (id: IOrdersId) => {
  //   message.open({
  //     type: "loading",
  //     content: "Suspending Orders..",
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
      headerName: "Recipient Name",
      headerAlign: "center",
      field: "recipient_name",
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
      headerName: "Recipient Number",
      headerAlign: "center",
      field: "recipient_number",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.recipient_number ? (
          <p>{data?.row?.recipient_number}</p>
        ) : (
          "-"
        ),
    },

    {
      headerName: "Recipient Email",
      headerAlign: "center",
      field: "recipient_email",
      align: "center",
      flex: 1,
      minWidth: 200,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.recipient_email ? <p>{data?.row?.recipient_email}</p> : "-",
    },
    {
      headerName: "Recipient Address",
      headerAlign: "center",
      field: "recipient_address",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.recipient_address ? (
          <p>{data?.row?.recipient_address}</p>
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
      headerName: "Expected Delivery Date",
      headerAlign: "center",
      field: "expected_delivery_date",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.expected_delivery_date
          ? moment(data?.row?.expected_delivery_date).format("ll")
          : "-",
    },
    {
      headerName: "Delivery Fee",
      headerAlign: "center",
      field: "delivery_fee",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.delivery_fee ? <p>{data?.row?.delivery_fee}</p> : "-",
    },

    {
      headerName: "Discount",
      headerAlign: "center",
      field: "discount",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.discount ? <p>{data?.row?.discount}</p> : "-",
    },
    {
      headerName: "User Name",
      headerAlign: "center",
      field: "user",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.user ? (
          <p>
            {[data?.row?.user?.first_name, data?.row?.user?.last_name].join(
              " "
            )}
          </p>
        ) : (
          "-"
        ),
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
            <Link to={`/app/orders/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        <GridActionsCellItem
          icon={
            <Link to={`/app/orders/i/${params.id}/edit`}>
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
        //     params.row.is_active ? "Suspend Orders" : "Activate Orders"
        //   }
        //   onClick={() => onSuspend(params.id)}
        // />,
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
