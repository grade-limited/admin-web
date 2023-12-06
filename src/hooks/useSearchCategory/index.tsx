import { useSearchCategories } from "@/queries/search";

const useSearchCategory = () => {
	const { data: categoryData, isLoading: categoryLoading } =
		useSearchCategories();

	return {
		isLoading: categoryLoading,
		data: categoryData,
	};
};

export default useSearchCategory;
