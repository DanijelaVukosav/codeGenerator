import React from 'react';
import { FilterCriteriaOperator } from '../../api/generalService/types';
import { FieldValues, UseFormWatch, UseFormSetValue, Path } from 'react-hook-form';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { OptionDropdown } from './OptionDropdown';

interface FilterOperationDropdownProps<TFormValues extends FieldValues = FieldValues> {
    id: Path<TFormValues>;
    isDisabled?: boolean;
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}

const STRING_FILTER_FILTER_OPTIONS_ARRAY = [
    FilterCriteriaOperator.EQUALS,
    FilterCriteriaOperator.CONTAINS
];

export const StringFilterOperationDropdown = <TFormValues extends FieldValues = FieldValues>({
    id,
    isDisabled,
    watch,
    setValue
}: FilterOperationDropdownProps<TFormValues>) => {
    return (
        <OptionDropdown
            id={id}
            isDisabled={isDisabled}
            watch={watch}
            setValue={setValue}
            options={STRING_FILTER_FILTER_OPTIONS_ARRAY}
        />
    );
};
