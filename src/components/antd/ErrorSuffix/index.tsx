import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";
import { AiFillInfoCircle } from "react-icons/ai";

const ErrorSuffix: React.FC<{
  error?: FieldError;
  size?: "small" | "medium" | "large";
  manual?: boolean;
}> = ({ error, size = "small", manual }) => {
  return (
    <>
      {error && (
        <Tooltip
          title={error.message}
          open={manual === false ? !error : true}
          arrow
          placement={"right"}
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
