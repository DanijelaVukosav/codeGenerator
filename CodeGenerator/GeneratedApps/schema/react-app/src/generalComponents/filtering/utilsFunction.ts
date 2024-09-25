import {
  FILTER_DATE_END,
  FILTER_DATE_START,
  FilterCriteria,
  FilterCriteriaOperator,
  FilterCriteriaType,
  MAPPED_LOCAL_DATE_TIME,
} from "../../api/generalService/types";
import { FieldValues } from "react-hook-form";
import { TableColumnType } from "../types";
import toastr from "toastr";

export const getFilterCriteriaArray = (data: any) => {
  const filterCriteria: FilterCriteria[] = [];
  Object.keys(data)?.forEach((key: string) => {
    if (data[key]) {
      let currentFilter: FilterCriteria | null = null;
      let tempFilter: FilterCriteria | null = null;
      if (key.startsWith(FILTER_DATE_START)) {
        currentFilter = {
          key: key.replace(FILTER_DATE_START, ""),
          value: data[key]?.value ?? data[key],
          operation: FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
          type: (data[key]?.type === FilterCriteriaType.LOCAL_DATE_TIME ? MAPPED_LOCAL_DATE_TIME : data[key]?.type) ?? FilterCriteriaType.LOCAL_DATE,
        };
      } else if (key.startsWith(FILTER_DATE_END)) {
        currentFilter = {
          key: key.replace(FILTER_DATE_END, ""),
          value: data[key]?.value ?? data[key],
          operation: FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
          type: (data[key]?.type === FilterCriteriaType.LOCAL_DATE_TIME ? MAPPED_LOCAL_DATE_TIME : data[key]?.type) ?? FilterCriteriaType.LOCAL_DATE,
        };
      } else if (data[key]?.operation === FilterCriteriaOperator.INTERVAL) {
        const parts = data[key]?.value?.split("-").map(Number);
        if (parts.length === 2) {
          currentFilter = {
            key: key,
            value: parts[0] ?? data[key],
            operation: FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
            type: data[key]?.type ?? (typeof data[key]?.value === "number" ? FilterCriteriaType.NUMBER : FilterCriteriaType.STRING),
          };
          tempFilter = {
            key: key,
            value: parts[1],
            operation: FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
            type: data[key]?.type ?? (typeof data[key]?.value === "number" ? FilterCriteriaType.NUMBER : FilterCriteriaType.STRING),
          };
        }
      } else {
        currentFilter = {
          key: key,
          value: data[key]?.value ?? data[key],
          operation: data[key]?.operation ?? FilterCriteriaOperator.CONTAINS,
          type: data[key]?.type ?? (typeof data[key]?.value === "number" ? FilterCriteriaType.NUMBER : FilterCriteriaType.STRING),
        };
      }
      currentFilter && currentFilter?.value && filterCriteria.push(currentFilter);
      tempFilter && tempFilter?.value && filterCriteria.push(tempFilter);
    }
  });
  return filterCriteria;
};

export const removeSelectedFilterCriteria = (
  removeFilterCriteria: FilterCriteria,
  chosenFilterCriteria: FilterCriteria[],
  formValues: FieldValues,
  setValue: any,
) => {
  let remainingFilters: FilterCriteria[];
  if (formValues[`${FILTER_DATE_START}${removeFilterCriteria.key}`] && removeFilterCriteria.operation === ">=") {
    remainingFilters = chosenFilterCriteria.filter(
      (filterCriteria: FilterCriteria) => !(filterCriteria.key === removeFilterCriteria.key && filterCriteria.operation === ">="),
    );
    setValue(`${FILTER_DATE_START}${removeFilterCriteria.key}.value`, "");
  } else if (formValues[`${FILTER_DATE_END}${removeFilterCriteria.key}`] && removeFilterCriteria.operation === "<=") {
    remainingFilters = chosenFilterCriteria.filter(
      (filterCriteria: FilterCriteria) => !(filterCriteria.key === removeFilterCriteria.key && filterCriteria.operation === "<="),
    );
    setValue(`${FILTER_DATE_END}${removeFilterCriteria.key}.value`, "");
  } else {
    remainingFilters = chosenFilterCriteria.filter((filterCriteria: FilterCriteria) => filterCriteria.key !== removeFilterCriteria.key);
    setValue(removeFilterCriteria.key, {
      value: "",
      operation: FilterCriteriaOperator.EQUALS,
      type: removeFilterCriteria.type,
    });
  }
  return remainingFilters;
};

export const validateFilteringSubmitData = (
  tableColumns: TableColumnType[],
  data: Record<
    string,
    {
      value: any;
      operation: FilterCriteriaOperator;
    }
  >,
) => {
  let isValidForm = true;
  tableColumns.forEach((columnSettings) => {
    if (
      data[`${FILTER_DATE_START}${columnSettings.key}`]?.value &&
      data[`${FILTER_DATE_END}${columnSettings.key}`]?.value &&
      new Date(data[`${FILTER_DATE_START}${columnSettings.key}`]?.value) > new Date(data[`${FILTER_DATE_END}${columnSettings.key}`]?.value)
    ) {
      toastr.error(`${columnSettings.label}: Start date must be before end date. Please change that.`);
      isValidForm = false;
    } else if (data[columnSettings.key]?.operation === FilterCriteriaOperator.INTERVAL) {
      const parts = data[columnSettings.key]?.value?.split("-").map(Number);
      if (parts.length !== 2 || parts[0] > parts[1]) {
        toastr.error(`${columnSettings.label}: Insert valid number interval`);
        isValidForm = false;
      }
    }
  });
  return isValidForm;
};
