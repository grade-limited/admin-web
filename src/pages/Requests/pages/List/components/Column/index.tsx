import { useDeleteRequest } from "@/queries/requests";
import { IRequestId } from "@/types";
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
    useDeleteRequest();

  const onDelete = async (
    id: IRequestId,
    permanent: any = null,
    restore: any = null
  ) => {
    message.open({
      type: "loading",
      content: permanent
        ? "Deleting Request Permanently.."
        : restore
        ? "Restoring Request.."
        : "Deleting Request..",
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

  // const onSuspend = async (id: IRequestId) => {
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
      headerName: "Org Name",
      headerAlign: "center",
      field: "organization_name",
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
      headerName: "Business Type",
      headerAlign: "center",
      field: "business_type",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.business_type ? <p>{data?.row?.business_type}</p> : "-",
    },
    {
      headerName: "Contact Number",
      headerAlign: "center",
      field: "contact_number",
      align: "center",
      flex: 1,
      minWidth: 250,
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
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_email ? <p>{data?.row?.contact_email}</p> : "-",
    },
    {
      headerName: "Contact Address",
      headerAlign: "center",
      field: "contact_address",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_address ? <p>{data?.row?.contact_address}</p> : "-",
    },
    {
      headerName: "Contact Person Name",
      headerAlign: "center",
      field: "contact_person_name",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_name ? (
          <p>{data?.row?.contact_person_name}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Person Phone",
      headerAlign: "center",
      field: "contact_person_phone",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_phone ? (
          <p>{data?.row?.contact_person_phone}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Person Address",
      headerAlign: "center",
      field: "contact_person_address",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_address ? (
          <p>{data?.row?.contact_person_address}</p>
        ) : (
          "-"
        ),
    },

    {
      headerName: "Contact Person Department",
      headerAlign: "center",
      field: "contact_person_dept",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_dept ? (
          <p>{data?.row?.contact_person_dept}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Person Designation",
      headerAlign: "center",
      field: "contact_person_designation",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_designation ? (
          <p>{data?.row?.contact_person_designation}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Person Branch",
      headerAlign: "center",
      field: "contact_person_branch",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_branch ? (
          <p>{data?.row?.contact_person_branch}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Person Desk Information",
      headerAlign: "center",
      field: "contact_person_desk_information",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_desk_information ? (
          <p>{data?.row?.contact_person_desk_information}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Contact Person Desk Unit",
      headerAlign: "center",
      field: "contact_person_business_unit",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (data: any) =>
        data?.row?.contact_person_business_unit ? (
          <p>{data?.row?.contact_person_business_unit}</p>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Status",
      headerAlign: "center",
      field: "request_status",
      align: "center",
      flex: 1,
      minWidth: 250,
      filterable: false,
      sortable: false,
      renderCell: (params: any) => [
        <StatusDropdown key={params?.id} {...params} />,
      ],
      // <>
      //   <Select
      //     size={"large"}
      //     placeholder={"Select Status"}
      //     className="w-full"
      //     defaultValue={data?.row?.request_status}
      //     value={status}
      //     options={statusData}
      //     onChange={(v) => {
      //       onSubmit({ id: data?.row?.id, request_status: v });
      //       setStatus(v);
      //     }}
      //   />
      // </>,
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
            <Link to={`/app/requests/i/${params.id}`}>
              <Button type="dashed">View</Button>
            </Link>
          }
          label="Details"
        />,
        // <GridActionsCellItem
        //   icon={
        //     <Link to={`/app/requests/i/${params.id}/edit`}>
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
