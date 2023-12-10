import { Avatar } from "antd";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Avatar src="/404.svg" className="w-[90%] h-auto max-w-lg" />
    </div>
  );
};

export default NotFound;
