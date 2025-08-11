import React from 'react';
import { FieldValues, UseFormWatch, UseFormRegister, UseFormSetValue, Path } from 'react-hook-form';
import { OptionDropdown } from './OptionDropdown';
import { FilterCriteriaOperator } from '../../api/generalService/types';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';

const NUMBER_INPUT_FIELD_REGEX = /^-?\d+$/;
const INTERVAL_NUMBER_INPUT_FIELD_REGEX = /^-?\d+--?\d+$/;

interface FilterNumberInputFieldProps<T extends FieldValues> {
    id: Path<T>;
    register: UseFormRegister<T>;
    type: string;
    placeholder?: string;
    label: string;
    disabled?: boolean;
    errorMessage?: string;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
}

export const FilterNumberInputField = <T extends FieldValues>({
    id,
    register,
    type,
    placeholder,
    label,
    disabled,
    errorMessage,
    watch,
    setValue
}: FilterNumberInputFieldProps<T>) => {
    const selectedObject = watch(id);
    const operation = selectedObject ? selectedObject.operation : '';

    return (
        <div className="filter_container">
            <label className="filter_label" htmlFor={id}>
                {label}
            </label>

            <div className={`operation_input_wrapper`}>
                <input
                    placeholder={placeholder}
                    title="Title"
                    type="text"
                    className="filter_field input_padding"
                    id={id}
                    {...register(`${id}.value` as Path<T>, {
                        pattern: {
                            value:
                                operation === FilterCriteriaOperator.INTERVAL
                                    ? INTERVAL_NUMBER_INPUT_FIELD_REGEX
                                    : NUMBER_INPUT_FIELD_REGEX,
                            message:
                                operation === FilterCriteriaOperator.INTERVAL
                                    ? 'Please enter a valid interval (e.g., 5, -5, 5-10, -5--10, -10-5)'
                                    : 'Please enter a valid number (e.g., 5, -5, 5.1)'
                        }
                    })}
                    step="1"
                    disabled={disabled}
                />
                <input
                    type="text"
                    hidden
                    className="filter_field input_padding"
                    id={id}
                    {...register(`${id}.type` as Path<T>)}
                    value={type}
                    readOnly
                />
                <NumberFilterOperationDropdown
                    id={id}
                    isDisabled={disabled}
                    setValue={setValue}
                    watch={watch}
                />
            </div>
            {errorMessage && <span className="error_message">{errorMessage}</span>}
        </div>
    );
};

interface FilterNumberOperationDropdownProps<T extends FieldValues> {
    id: Path<T>;
    isDisabled?: boolean;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
}

const NUMBER_FILTER_FILTER_OPTIONS_ARRAY = [
    FilterCriteriaOperator.EQUALS,
    FilterCriteriaOperator.LESS_THEN,
    FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
    FilterCriteriaOperator.MORE_THEN,
    FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
    FilterCriteriaOperator.INTERVAL,
    FilterCriteriaOperator.CONTAINS
];

export const NumberFilterOperationDropdown = <T extends FieldValues>({
    id,
    isDisabled,
    watch,
    setValue
}: FilterNumberOperationDropdownProps<T>) => {
    return (
        <OptionDropdown
            id={id}
            isDisabled={isDisabled}
            watch={watch}
            setValue={setValue}
            options={NUMBER_FILTER_FILTER_OPTIONS_ARRAY}
        />
    );
};
