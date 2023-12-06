export type ICreateRequest = {
  name: string;
  description: string;
  thumbnail_url: string;
  cover_url: string;
};

export type IUpdateRequest = {
  request_status: string;
};
