export type ICreateExam = {
  name: string;
  description: number;
  duration: number;
  negative_mark: number;
  type: string;
  attendee_type: string;
  is_archivable: boolean;
  live_datetime: string;
  question_bank_id: number;
};

export type IUpdateExam = {
  name: string;
  description: number;
  duration: number;
  negative_mark: number;
  type: string;
  attendee_type: string;
  is_archivable: boolean;
  live_datetime: string;
  question_bank_id: number;
};
