import {
    CustomAnyType,
    FILTER_DATE_END,
    FILTER_DATE_START,
    FilterCriteria,
    FilterCriteriaOperator,
    FilterCriteriaType,
    MAPPED_LOCAL_DATE_TIME
} from '../../api/generalService/types';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { COLUMN_TYPE, TableColumnType } from '../types';
import toastr from 'toastr';
import { FilterField, FilterFormData } from './FilterContainer';

export const getFilterCriteriaArray = (data: FilterFormData): FilterCriteria[] => {
    const filterCriteria: FilterCriteria[] = [];

    Object.keys(data)?.forEach((key: string) => {
        const currentData: FilterField | string | undefined = data[key];
        if (currentData) {
            let currentFilter: FilterCriteria | null = null;
            let tempFilter: FilterCriteria | null = null;

            if (key.startsWith(FILTER_DATE_START)) {
                currentFilter = {
                    key: key.replace(FILTER_DATE_START, ''),
                    value: currentData ? currentData.value : currentData,
                    operation: FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
                    type:
                        (currentData.type === FilterCriteriaType.LOCAL_DATE_TIME
                            ? MAPPED_LOCAL_DATE_TIME
                            : currentData.type) ?? FilterCriteriaType.LOCAL_DATE
                };
            } else if (key.startsWith(FILTER_DATE_END)) {
                currentFilter = {
                    key: key.replace(FILTER_DATE_END, ''),
                    value: currentData ? currentData.value : currentData,
                    operation: FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
                    type:
                        (currentData.type === FilterCriteriaType.LOCAL_DATE_TIME
                            ? MAPPED_LOCAL_DATE_TIME
                            : currentData.type) ?? FilterCriteriaType.LOCAL_DATE
                };
            } else if (
                currentData.operation === FilterCriteriaOperator.INTERVAL &&
                typeof currentData.value === 'string'
            ) {
                const parts = currentData.value.split('-').map(Number);
                if (parts.length === 2) {
                    currentFilter = {
                        key,
                        value: parts[0],
                        operation: FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
                        type:
                            currentData.type ??
                            (typeof parts[0] === 'number'
                                ? FilterCriteriaType.NUMBER
                                : FilterCriteriaType.STRING)
                    };
                    tempFilter = {
                        key,
                        value: parts[1],
                        operation: FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
                        type:
                            currentData.type ??
                            (typeof parts[1] === 'number'
                                ? FilterCriteriaType.NUMBER
                                : FilterCriteriaType.STRING)
                    };
                }
            } else {
                currentFilter = {
                    key,
                    value: currentData ? currentData.value : currentData,
                    operation: currentData.operation ?? FilterCriteriaOperator.CONTAINS,
                    type: getFilteredObjectType(currentData)
                };
            }

            if (currentFilter && currentFilter.value) {
                filterCriteria.push(currentFilter);
            }
            if (tempFilter && tempFilter.value) {
                filterCriteria.push(tempFilter);
            }
        }
    });

    return filterCriteria;
};

const getFilteredObjectType = (
    filterObject: FilterField | CustomAnyType
): FilterCriteriaType | 'enum_filter' => {
    if (
        filterObject &&
        typeof filterObject === 'object' &&
        'type' in filterObject &&
        filterObject.type === COLUMN_TYPE.ENUM
    ) {
        return 'enum_filter';
    }
    if (
        filterObject &&
        typeof filterObject === 'object' &&
        'type' in filterObject &&
        filterObject.type !== undefined
    ) {
        return filterObject.type as FilterCriteriaType;
    }
    if (filterObject && typeof filterObject === 'object' && 'value' in filterObject) {
        const val = filterObject.value;
        return typeof val === 'number' ? FilterCriteriaType.NUMBER : FilterCriteriaType.STRING;
    }
    return typeof filterObject === 'number' ? FilterCriteriaType.NUMBER : FilterCriteriaType.STRING;
};

export const removeSelectedFilterCriteria = (
    removeFilterCriteria: FilterCriteria,
    chosenFilterCriteria: FilterCriteria[],
    formValues: FieldValues,
    setValue: UseFormSetValue<FilterFormData>
): FilterCriteria[] => {
    let remainingFilters: FilterCriteria[];
    if (
        formValues[`${FILTER_DATE_START}${removeFilterCriteria.key}`] &&
        removeFilterCriteria.operation === FilterCriteriaOperator.EQUALS_OR_MORE_THEN
    ) {
        remainingFilters = chosenFilterCriteria.filter(
            (filterCriteria: FilterCriteria) =>
                !(
                    filterCriteria.key === removeFilterCriteria.key &&
                    filterCriteria.operation === FilterCriteriaOperator.EQUALS_OR_MORE_THEN
                )
        );
        setValue(`${FILTER_DATE_START}${removeFilterCriteria.key}.value`, '');
    } else if (
        formValues[`${FILTER_DATE_END}${removeFilterCriteria.key}`] &&
        removeFilterCriteria.operation === FilterCriteriaOperator.EQUALS_OR_LESS_THEN
    ) {
        remainingFilters = chosenFilterCriteria.filter(
            (filterCriteria: FilterCriteria) =>
                !(
                    filterCriteria.key === removeFilterCriteria.key &&
                    filterCriteria.operation === FilterCriteriaOperator.EQUALS_OR_LESS_THEN
                )
        );
        setValue(`${FILTER_DATE_END}${removeFilterCriteria.key}.value`, '');
    } else {
        remainingFilters = chosenFilterCriteria.filter(
            (filterCriteria: FilterCriteria) => filterCriteria.key !== removeFilterCriteria.key
        );
        setValue(removeFilterCriteria.key, {
            value: '',
            operation: FilterCriteriaOperator.EQUALS,
            type: removeFilterCriteria.type
        });
    }
    return remainingFilters;
};

export const validateFilteringSubmitData = (
    tableColumns: TableColumnType[],
    data: FilterFormData
): boolean => {
    let isValidForm = true;
    tableColumns.forEach((columnSettings) => {
        const startKey = `${FILTER_DATE_START}${columnSettings.key}`;
        const endKey = `${FILTER_DATE_END}${columnSettings.key}`;
        const startValue = data[startKey]?.value?.toString();
        const endValue = data[endKey]?.value?.toString();

        if (
            startValue !== undefined &&
            endValue !== undefined &&
            new Date(startValue).getTime() > new Date(endValue).getTime()
        ) {
            toastr.error(
                `${columnSettings.label}: Start date must be before end date. Please change that.`
            );
            isValidForm = false;
        } else if (data[columnSettings.key]?.operation === FilterCriteriaOperator.INTERVAL) {
            const parts = (data[columnSettings.key]?.value as string)?.split('-').map(Number);
            if (!parts || parts.length !== 2 || parts[0] > parts[1]) {
                toastr.error(`${columnSettings.label}: Insert valid number interval`);
                isValidForm = false;
            }
        }
    });
    return isValidForm;
};
