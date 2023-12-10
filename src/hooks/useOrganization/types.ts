export interface IOption {
  value?: string | number | null;
  label: React.ReactNode;
  children?: IOption[];
  isLeaf?: boolean;
  loading?: boolean;
  data?: any;
}
