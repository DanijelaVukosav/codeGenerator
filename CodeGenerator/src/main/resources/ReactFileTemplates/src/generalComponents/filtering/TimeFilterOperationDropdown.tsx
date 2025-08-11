import React from 'react';
import { FieldValues, UseFormWatch, UseFormSetValue, Path } from 'react-hook-form';
import { FilterCriteriaOperator } from '../../api/generalService/types';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { OptionDropdown } from './OptionDropdown';

interface TimeFilterOperationDropdownProps<TFormValues extends FieldValues = FieldValues> {
    id: Path<TFormValues>;
    isDisabled?: boolean;
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}

const TIME_FILTER_FILTER_OPTIONS_ARRAY = [
    FilterCriteriaOperator.EQUALS,
    FilterCriteriaOperator.LESS_THEN,
    FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
    FilterCriteriaOperator.MORE_THEN,
    FilterCriteriaOperator.EQUALS_OR_MORE_THEN
];

export const TimeFilterOperationDropdown = <TFormValues extends FieldValues = FieldValues>({
    id,
    isDisabled,
    watch,
    setValue
}: TimeFilterOperationDropdownProps<TFormValues>) => {
    return (
        <OptionDropdown
            id={id}
            isDisabled={isDisabled}
            watch={watch}
            setValue={setValue}
            options={TIME_FILTER_FILTER_OPTIONS_ARRAY}
        />
    );
};
