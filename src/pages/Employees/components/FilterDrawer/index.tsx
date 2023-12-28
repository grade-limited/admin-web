import useRole from "@/hooks/useRole";
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
  const { role, isRoleLoading, searchRole } = useRole();

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
        <Label className="pb-1">Role</Label>
        <Cascader
          value={watch("role") as any}
          size="large"
          showSearch
          allowClear
          className="w-full"
          placeholder={"Filter Role"}
          suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
          onChange={(v) => setFilterField("role", v)}
          options={role}
          onSearch={searchRole}
          loading={isRoleLoading}
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
