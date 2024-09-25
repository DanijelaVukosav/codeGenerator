export const DEFAULT_PAGE_SIZE = 20;

export const PREDEFINED_PAGE_SIZES = ["2", "5", "10", "20", "50", "100"];

export enum COLUMN_TYPE {
  TEXT = "text",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  MULTISELECT_CHECKBOX = "multiselect_checkbox",
  DATE = "date",
  DATE_TIME = "datetime-local",
  TIME = "time",
  PASSWORD = "password",
  ENUM = "enum",
}

interface FormProperties {
  isVisible: boolean;
  required?: boolean;
  maxLength?: number;
  isHiddenOnEditing?: boolean;
  isDisabledEditing?: boolean;
  defaultValue?: string | number;
  max?: number;
}

export interface TableColumnType {
  key: string;
  label: string;
  hasSort?: boolean;
  hasFilter?: boolean;
  type: COLUMN_TYPE;
  options?: (string | number)[];
  isVisibleOnTable: boolean;
  isVisibleOnSinglePage?: boolean;
  placeholder?: string;
  formProperties: FormProperties;
}
