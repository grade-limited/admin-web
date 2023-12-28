import Label from "@components/Label";
import Iconify from "@components/iconify";
import { Divider, Drawer, IconButton, ListItemText } from "@mui/material";
import { Select } from "antd";
import React from "react";

const FilterDrawer: React.FC<{
  setFilterField: (key: string, value: any) => void;
  watch: (key: any) => string | undefined;
  open: boolean;
  onClose: () => void;
}> = ({ setFilterField, watch, open, onClose }) => {
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
        <Label className="pb-1">Business Type</Label>
        <Select
          placeholder={"Business Type"}
          className="w-full"
          value={watch("business_type")}
          allowClear
          onChange={(v) => setFilterField("business_type", v)}
          options={[
            {
              label: "Retail Shop",
              value: "Retail Shop",
            },
            {
              label: "Hotel/Restaurant",
              value: "Hotel/Restaurant",
            },
            {
              label: "Corporate Company",
              value: "Corporate Company",
            },
          ]}
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
