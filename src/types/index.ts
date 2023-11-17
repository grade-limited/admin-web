export type IUserId = string | number | undefined;
export type ISessionId = any;
export type IEmployeeId = string | number | undefined;
export type ISubjectId = string | number | undefined;
export type IChapterId = string | number | undefined;
export type ITopicId = string | number | undefined;
export type IQsnBankId = string | number | undefined;
export type IExamId = string | number | undefined;
export type IQuestionId = string | number | undefined;

//data grid types

import {
  GridCallbackDetails,
  GridColDef,
  GridFeatureMode,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

export type GridNativeColTypes =
  | "string"
  | "number"
  | "date"
  | "dateTime"
  | "boolean"
  | "singleSelect";

export type GridAlignment = "left" | "right" | "center";

export type IDataTable = {
  columns: GridColDef[];
  rows: any;
  isLoading?: boolean;
  getRowId?: any;
  checked?: boolean;
  rowCount?: number;
  paginationMode?: GridFeatureMode;
  page?: number;
  onPageChange?: (newPage: number) => void;
  pageSize?: number;
  onPageSizeChange?: (newLimit: number) => void;
  checkboxSelection?: boolean;
  onSelectionModelChange?: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => void;
  selectionModel?: GridRowSelectionModel;
  keepNonExistentRowsSelected?: boolean;
};
