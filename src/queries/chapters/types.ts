import { ISubjectId } from "@/types";

export type ICreateChapter = {
  subject_id: ISubjectId;
  name: string;
  cover_picture: string;
  description: number;
};

export type IUpdateChapter = {
  subject_id: ISubjectId;
  name: string;
  cover_picture: string;
  description: number;
};
