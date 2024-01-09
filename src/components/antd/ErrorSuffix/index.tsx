import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";
import { AiFillInfoCircle } from "react-icons/ai";

const ErrorSuffix: React.FC<{
  error?: FieldError;
  size?: "small" | "medium" | "large";
  manual?: boolean;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}> = ({ error, size = "small", manual, placement = "right" }) => {
  return (
    <>
      {error && (
        <Tooltip
          title={error.message}
          open={manual === false ? !error : true}
          arrow
          placement={placement}
        >
          <IconButton
            color={"error"}
            // className="text-red-700"
            size={size}
          >
            <AiFillInfoCircle />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default ErrorSuffix;
