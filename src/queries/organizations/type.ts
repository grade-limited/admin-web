import { ICategoryId } from "@/types";

export type ICreateOrganization = {
  name: string;
  description: string;
  thumbnail_url: string;
  category_id: ICategoryId;
};

export type IUpdateOrganization = {
  name: string;
  description: string;
  thumbnail_url: string;
  category_id: ICategoryId;
};

export interface IOption {
  value?: string | number | null;
  label: string;
  children?: IOption[];
  data?: any;
}
