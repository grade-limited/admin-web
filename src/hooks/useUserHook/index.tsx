import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { useGetUsers } from "@/queries/users";
import { IOption } from "./types";

const useUserHook = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [user, setUser] = React.useState<IOption[]>([]);
  const { data: userData, isLoading: userLoading } = useGetUsers(
    getQueryParams()
  );
  React.useEffect(() => {
    if (!userData) return;
    var d: IOption[] = [];
    userData?.data?.data?.map?.(
      (s: { id: string; first_name: string; last_name: string }) => {
        d.push({
          value: s.id,
          label: [s.first_name, s.last_name].join(" "),
          data: s,
        });
      }
    );
    setUser(d);
  }, [userData]);

  return {
    isUserLoading: userLoading,
    user,
    searchUser: (value: string) => {
      setSearch(value);
    },
  };
};

export default useUserHook;
