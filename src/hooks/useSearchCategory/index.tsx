import { useSearchCategories } from "@/queries/search";

const useSearchCategory = () => {
  const { data: categoryData, isLoading: categoryLoading } =
    useSearchCategories();
  interface Category {
    id: number;
    name: string;
    icon_url: string | null;
    children: Category[];
  }

  function getParentHierarchyIds(
    categories: Category[] = [],
    targetId: number
  ): number[] | null {
    function findParent(
      categoryList: Category[] = [],
      parentId: number,
      currentPath: number[]
    ): number[] | null {
      for (const category of categoryList) {
        const path = [...currentPath, category.id];

        if (category.id === parentId) {
          return path;
        } else if (category.children.length > 0) {
          const foundInChild = findParent(category.children, parentId, path);
          if (foundInChild) {
            return foundInChild;
          }
        }
      }

      return null;
    }

    for (const category of categories) {
      const path = findParent(category.children, targetId, [category.id]);
      if (path) {
        return path;
      }
    }

    return null;
  }
  return {
    findHierarchy: (id: number | number[]) =>
      getParentHierarchyIds(
        categoryData,
        Array.isArray(id) ? id?.[id.length - 1] : id
      ),
    isLoading: categoryLoading,
    data: categoryData,
  };
};

export default useSearchCategory;
