import { Icon, Tooltip, Typography } from "@mui/material";
import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";

const Label: React.FC<{
  children: React.ReactNode;
  info?: string;
  isRequired?: boolean;
  className?: string;
  openInfo?: boolean;
}> = ({ children, info, isRequired = false, className, openInfo }) => {
  return (
    <Typography
      variant="overline"
      className={`normal-case text-sm flex flex-row items-center gap-1 ${
        className || ""
      }`}
    >
      <span className="flex flex-row items-center gap-[2px]">
        {children}
        {isRequired && (
          <span className="text-red-600 text-lg font-bold ml-[2px]">*</span>
        )}
      </span>
      {info && (
        <Tooltip title={info} arrow placement="right" open={openInfo}>
          <Icon color={"action"} className="text-base mb-1">
            <AiFillInfoCircle />
          </Icon>
        </Tooltip>
      )}
    </Typography>
  );
};

export default Label;
