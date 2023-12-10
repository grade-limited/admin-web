export type ICreateEmployeeship = {
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
  display_picture: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  max_session: number;
  role_id: number;
};

export type IUpdateEmployeeship = {
  first_name: string;
  last_name: string;
  gender: string;
  display_picture: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  max_session: number;
  role_id: number;
};
