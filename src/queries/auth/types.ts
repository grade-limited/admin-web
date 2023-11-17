// Login Type
export type ILogin = {
  phone: string;
  password: string;
};

export type IUpdateUser = {
  first_name: string;
  last_name: string;
  email: string;
  display_picture: string;
  gender: string;
  dob: string;
  bank: string;
  address: string;
};

//Sigup Type
export type ISignup = {
  firstName: string;
  lastName: string;
  type: string;
  userName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  vendorID: number;
  roleID: number;
  createdBy: string;
};
