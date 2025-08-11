export type CustomAnyType =
    | string
    | number
    | boolean
    | Date
    | undefined
    | null
    | CustomObjectType
    | CustomObjectType[]
    | string[]
    | RegExp;
export interface CustomObjectType {
  [key: string | number]: CustomAnyType;
}

export default class Response<T> {
  public Status: boolean;
  public Data: T;
  public Messages: string;
  public Exception: string;

  constructor(status: boolean, data: T, mess: string, exception: string) {
    this.Status = status;
    this.Data = data;
    this.Messages = mess;
    this.Exception = exception;
  }
}
export const PATH_SEPARATOR = '/';

export const enum FilterCriteriaOperator {
  MORE_THEN = '>',
  EQUALS_OR_MORE_THEN = '>=',
  LESS_THEN = '<',
  EQUALS_OR_LESS_THEN = '<=',
  EQUALS = '=',
  CONTAINS = '%',
  INTERVAL = '[]'
}

export const enum FilterCriteriaType {
  LOCAL_DATE = 'date',
  LOCAL_DATE_TIME = 'datetime-local',
  NUMBER = 'number',
  STRING = 'text',
  CHECKBOX = 'checkbox'
}

export const MAPPED_LOCAL_DATE_TIME = 'datetime_local';

export interface FilterCriteria {
  key: string;
  operation: FilterCriteriaOperator;
  value: CustomAnyType;
  type?: string;
}

export interface FilterData {
  filter: FilterCriteria[];
  page: number;
  size: number;
  sort?: string[];
}

export const enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export const SORT_TUPLE_SEPARATOR = ',';
export const FILTER_DATE_START = 'date_start#';
export const FILTER_DATE_END = 'date_end#';
