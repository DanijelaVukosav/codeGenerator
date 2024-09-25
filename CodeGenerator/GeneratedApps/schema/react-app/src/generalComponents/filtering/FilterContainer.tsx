import React, { FC, useCallback, useMemo, useState } from "react";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";
import { useForm } from "react-hook-form";
import { getFilterCriteriaArray, removeSelectedFilterCriteria, validateFilteringSubmitData } from "./utilsFunction";
import { FilterContainerWrapper } from "./FilterComponents";
import { TableFilterFields } from "./TableFilterFields";
import { ChosenFilterCriteriaContainer } from "./ChosenFilterCriteriaContainer";
import { FilterCriteria, FilterCriteriaOperator } from "../../api/generalService/types";
import { TableColumnType } from "../types";

export type FilterContainerProps = {
  tableColumnsConfig: TableColumnType[];
  changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
  predefinedFilterCriteria?: FilterCriteria | undefined;
  isExpandedFilterContainer: boolean;
  setExpandedFilterContainer?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  clearFilters: () => void;
};

export const FilterContainer: FC<FilterContainerProps> = ({
  tableColumnsConfig,
  changeFilterCriteria,
  predefinedFilterCriteria,
  isExpandedFilterContainer,
  setExpandedFilterContainer,
  clearFilters,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: predefinedFilterCriteria
      ? {
          [predefinedFilterCriteria.key]: {
            value: predefinedFilterCriteria.value,
            operation: predefinedFilterCriteria.operation,
          },
        }
      : {},
  });
  const [chosenFilterCriteria, setChosenFilterCriteria] = useState<FilterCriteria[]>([]);

  const onFilterSubmit = useCallback(
    (data: any) => {
      if (!validateFilteringSubmitData(tableColumnsConfig, data)) return;
      const filterCriteria: FilterCriteria[] = getFilterCriteriaArray(data);
      setChosenFilterCriteria(filterCriteria);
      changeFilterCriteria(filterCriteria);
      setExpandedFilterContainer?.(false);
    },
    [changeFilterCriteria, setChosenFilterCriteria, setExpandedFilterContainer, tableColumnsConfig],
  );

  const removeFilter = (removeFilterCriteria: FilterCriteria) => {
    const formValues = getValues();
    const remainingFilters = removeSelectedFilterCriteria(removeFilterCriteria, chosenFilterCriteria, formValues, setValue);

    setChosenFilterCriteria(remainingFilters);
    changeFilterCriteria(remainingFilters);
  };

  const clearFilterForm = () => {
    const fields = getValues();
    const resetValues: Record<string, { value: string; operation?: FilterCriteriaOperator }> = {};

    for (const field in fields) {
      if (predefinedFilterCriteria?.key === field)
        resetValues[field] = {
          value: predefinedFilterCriteria.value,
          operation: predefinedFilterCriteria?.operation,
        };
      else {
        resetValues[field] = { value: "" };
      }
    }
    reset(resetValues);
    setChosenFilterCriteria([]);
    clearFilters();
  };

  const tableFilterFields = useMemo(() => {
    return tableColumnsConfig.filter((columnSettings: TableColumnType) => columnSettings.hasFilter);
  }, [tableColumnsConfig]);

  return (
    <React.Fragment>
      <FilterContainerWrapper hidden={!isExpandedFilterContainer}>
        <TableFilterFields
          columnsSettings={tableFilterFields}
          predefinedFilterCriteria={predefinedFilterCriteria}
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
          onSubmitForm={handleSubmit(onFilterSubmit)}
          clearFilterForm={clearFilterForm}
        />
      </FilterContainerWrapper>
      <ChosenFilterCriteriaContainer chosenFilterCriteria={chosenFilterCriteria} visible={!isExpandedFilterContainer} onClick={removeFilter} />
    </React.Fragment>
  );
};
