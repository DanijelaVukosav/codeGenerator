export default class Response {
  public Status: boolean;
  public Data: any;
  public Messages: string;
  public Exception: string;

  constructor(status: boolean, data: any, mess: string, exception: string) {
    this.Status = status;
    this.Data = data;
    this.Messages = mess;
    this.Exception = exception;
  }
}
export const PATH_SEPARATOR = "/";

export const enum FilterCriteriaOperator {
  MORE_THEN = ">",
  EQUALS_OR_MORE_THEN = ">=",
  LESS_THEN = "<",
  EQUALS_OR_LESS_THEN = "<=",
  EQUALS = "=",
  CONTAINS = "%",
  INTERVAL = "[]",
}

export const enum FilterCriteriaType {
  LOCAL_DATE = "date",
  LOCAL_DATE_TIME = "datetime-local",
  NUMBER = "number",
  STRING = "text",
  CHECKBOX = "checkbox",
}

export const MAPPED_LOCAL_DATE_TIME = "datetime_local";

export type FilterCriteria = {
  key: string;
  operation: FilterCriteriaOperator;
  value: any;
  type?: string;
};

export type FilterData = {
  filter: FilterCriteria[];
  page: number;
  size: number;
  sort?: string[];
};

export const enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export const SORT_TUPLE_SEPARATOR = ",";
export const FILTER_DATE_START = "date_start#";
export const FILTER_DATE_END = "date_end#";
