import useBrand from "@/hooks/useBrand";
import useSearchCategory from "@/hooks/useSearchCategory";
import Label from "@components/Label";
import Iconify from "@components/iconify";
import { Divider, Drawer, IconButton, ListItemText } from "@mui/material";
import { Cascader, Select } from "antd";
import React from "react";

const FilterDrawer: React.FC<{
  setFilterField: (key: string, value: any) => void;
  watch: (key: any) => string | undefined;
  open: boolean;
  onClose: () => void;
}> = ({ setFilterField, watch, open, onClose }) => {
  const { brand, isBrandLoading, searchBrand } = useBrand();
  const {
    isLoading: isCategoryLoading,
    data: category,
    findHierarchy,
  } = useSearchCategory();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        className: "w-[95vw] max-w-[420px]",
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
        <Label className="pb-1">Brand</Label>
        <Select
          value={watch("brand_id")}
          size="large"
          showSearch
          allowClear
          className="w-full"
          placeholder={"Filter Brand"}
          suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
          onChange={(v) => setFilterField("brand_id", v)}
          options={brand}
          onSearch={searchBrand}
          loading={isBrandLoading}
        />
      </div>
      <div className="p-2 px-6">
        <Label className="pb-1">Category</Label>
        <Cascader
          value={
            watch("category_id")
              ? (findHierarchy(parseInt(watch("category_id") || "0")) as any) ||
                watch("category_id")
              : undefined
          }
          size="large"
          showSearch
          className="w-full"
          placeholder={"Select a Parent Category..."}
          suffixIcon={<Iconify icon={"mingcute:search-3-line"} />}
          onChange={(v) => setFilterField("category_id", v)}
          options={category}
          fieldNames={{ label: "name", value: "id" }}
          changeOnSelect
          allowClear
          // onSearch={searchCategory}
          loading={isCategoryLoading}
          expandTrigger="click"
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
