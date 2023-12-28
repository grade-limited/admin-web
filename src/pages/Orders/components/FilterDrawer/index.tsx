import useCustomer from "@/hooks/useCustomer";
import Label from "@components/Label";
import Iconify from "@components/iconify";
import { Divider, Drawer, IconButton, ListItemText } from "@mui/material";
import { Cascader } from "antd";
import React from "react";

const FilterDrawer: React.FC<{
  setFilterField: (key: string, value: any) => void;
  watch: (key: any) => string | undefined;
  open: boolean;
  onClose: () => void;
}> = ({ setFilterField, watch, open, onClose }) => {
  const { user, isUserLoading, searchUser } = useCustomer();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        className: "w-[95vw] max-w-[320px]",
      }}
    >
      <div className="flex flex-row items-center justify-between p-2 px-6">
        <ListItemText
          primary={"Filter"}
          secondary={"Based on different parameters"}
        />

        <IconButton size={"small"} onClick={onClose}>
          <Iconify icon={"ci:close-md"} />
        </IconButton>
      </div>
      <Divider className="my-1" />
      <div className="p-2 px-6">
        <Label className="pb-1">User</Label>
        <Cascader
          value={watch("user_id") as any}
          size="large"
          showSearch
          allowClear
          className="w-full"
          placeholder={"Filter User"}
          suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
          onChange={(v) => setFilterField("user_id", v)}
          options={user}
          onSearch={searchUser}
          loading={isUserLoading}
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
