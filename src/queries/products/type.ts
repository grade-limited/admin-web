import { IBrandId, ICategoryId } from "@/types";

export type ICreateProduct = {
  name: string;
  description: string;
  thumbnail_url: string;
  category_id: ICategoryId;
  brand_id: IBrandId;
};

export type IUpdateProduct = {
  name: string;
  description: string;
  thumbnail_url: string;
  category_id: ICategoryId;
  brand_id: IBrandId;
};
