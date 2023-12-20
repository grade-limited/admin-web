export type IUpdateUser = {
  first_name: string;
  last_name: string;
  gender?: string;
  password: string;
  display_picture: string;
  email: string;
  phone: string;
  dob?: string;
  primary_contact: number;
  registered_from: string;
  referral_code: string;
  address?: string;
};
export type ICreateUser = {
  first_name: string;
  last_name: string;
  gender?: string;
  password: string;
  display_picture: string;
  email: string;
  phone: string;
  dob?: string;
  primary_contact: number;
  registered_from: string;
  referral_code: string;
  address?: string;
};
