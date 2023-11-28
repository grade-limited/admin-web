import { MdOutlineSettings } from "react-icons/md";
import { IDrawerData } from "../types";
import { Icon } from "@iconify/react";
import { VscSignOut } from "react-icons/vsc";

export const DrawerData = (logout?: () => void): IDrawerData[] => [
  {
    title: "General",
    sublist: [
      {
        name: "Dashboard",
        icon: <Icon icon="carbon:dashboard" />,
        to: "/app",
      },
    ],
  },
  {
    title: "Operations",
    sublist: [
      {
        name: "Users",
        icon: <Icon icon="la:users" />,
        to: "/app/users",
        disabled: true,
      },
      {
        name: "Products",
        icon: <Icon icon="solar:box-broken" />,
        to: "/app/products",
      },
      {
        name: "Brands",
        icon: <Icon icon="tabler:brand-shopee" />,
        to: "/app/brands",
      },
      {
        name: "Categories",
        icon: <Icon icon="iconamoon:category-light" />,
        to: "/app/categories",
      },
    ],
  },
  {
    title: "Additional",
    sublist: [
      {
        name: "Roles",
        icon: <Icon icon="fluent:phone-key-20-regular" />,
        to: "/app/roles",
        disabled: false,
      },
      {
        name: "Employees",
        icon: <Icon icon="clarity:employee-group-line" />,
        to: "/app/employees",
      },
    ],
  },
  {
    title: "Personal",
    sublist: [
      {
        name: "Settings",
        icon: <MdOutlineSettings />,
        to: "/app/settings",
      },
      // {
      // 	name: "Help",
      // 	icon: <Icon icon="material-symbols:live-help-outline-rounded" />,
      // 	to: "/app/help",
      // },
      {
        name: "Logout",
        icon: <VscSignOut />,
        function: logout,
      },
    ],
  },
];
