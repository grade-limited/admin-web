import { ISessionId } from "@/types";

export type ISession = {
  id: ISessionId;
  ip_address?: string;
  address_details?: string;
  device_details?: string;
  user_agent?: string;
  latitude?: boolean;
  longitude?: string;
  last_login?: string;
  logged_out_at?: string;
  logged_in_at?: string;
  updated_at?: string;
  deleted_at?: string;
  user?: {
    id: 1;
    first_name: "string";
    last_name: "string";
    is_active: boolean;
    deleted_at: string;
  };
  // updateStatus: (status: IScheduleStatus) => void;
  // switchStatus?: boolean;
};
