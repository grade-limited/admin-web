import React from "react";

import { Icon } from "@iconify/react";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SETTINGS_ROUTES } from "./routes/paths";

const items: MenuProps["items"] = [
  {
    label: "Personal",
    key: SETTINGS_ROUTES.PERSONAL,
    icon: <Icon icon="ic:twotone-person-pin" className="text-xl" />,
  },
  {
    label: "Security",
    key: SETTINGS_ROUTES.SECURITY,
    icon: <Icon icon="ic:twotone-lock-person" className="text-xl" />,
  },
  {
    label: "Session",
    key: SETTINGS_ROUTES.SESSION,
    icon: <Icon icon="ic:twotone-lock-person" className="text-xl" />,
  },
];

const Navigator: React.FC = () => {
  // To get the current location pathname
  let location = useLocation();

  // To route
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[location.pathname?.split?.("/")[3] || ""]}
      mode="horizontal"
      items={items}
      className={"mb-5 justify-center"}
    />
  );
};

export default Navigator;
