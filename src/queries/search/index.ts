import instance from "@/services";
import { useQuery } from "@tanstack/react-query";

//Get All List
const searchCategories = () => {
	return instance.get(`search/category`);
};

export const useSearchCategories = () => {
	return useQuery(["search/category"], searchCategories, {
		select(data) {
			return data.data;
		},
	});
};
