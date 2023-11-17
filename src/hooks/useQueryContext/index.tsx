import React from "react";
import QueryContext from "@/contexts/QueryContext";

const useQueryContext = () => {
	return React.useContext(QueryContext);
};

export default useQueryContext;
