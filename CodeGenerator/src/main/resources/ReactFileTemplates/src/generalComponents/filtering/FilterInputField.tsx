import React, { useMemo } from 'react';
import { StringFilterOperationDropdown } from './StringFilterOperationDropdown';
import { TimeFilterOperationDropdown } from './TimeFilterOperationDropdown';
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldValues, Path } from 'react-hook-form';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';

interface FilterInputFieldProps<TFormValues extends FieldValues = FieldValues> {
    id: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    type: 'text' | 'number' | 'date' | 'datetime' | 'datetime-local' | 'time'; // restrict to valid types
    placeholder?: string;
    label: string;
    disabled?: boolean;
    errorMessage?: string;
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}

export const FilterInputField = <TFormValues extends FieldValues = FieldValues>({
    id,
    register,
    type,
    placeholder,
    label,
    disabled,
    errorMessage,
    watch,
    setValue
}: FilterInputFieldProps<TFormValues>) => {
    const simpleInput = useMemo(
        () => type === 'date' || type === 'datetime' || type === 'datetime-local',
        [type]
    );

    return (
        <div className="filter_container">
            <label className="filter_label" htmlFor={id}>
                {label}
            </label>

            <div className={simpleInput ? '' : 'operation_input_wrapper'}>
                <input
                    placeholder={placeholder}
                    title="Title"
                    type={type}
                    className="filter_field input_padding"
                    id={id}
                    {...register(`${id}.value` as Path<TFormValues>)} // value subpath
                    step="1"
                    disabled={disabled}
                />
                <input
                    type="text"
                    hidden
                    className="filter_field input_padding"
                    id={`${id}-type`}
                    {...register(`${id}.type` as Path<TFormValues>)} // type subpath
                    value={type}
                    readOnly
                />
                {type === 'text' && (
                    <StringFilterOperationDropdown
                        id={id}
                        isDisabled={disabled}
                        setValue={setValue}
                        watch={watch}
                    />
                )}
                {type === 'time' && (
                    <TimeFilterOperationDropdown
                        id={id}
                        isDisabled={disabled}
                        setValue={setValue}
                        watch={watch}
                    />
                )}
            </div>

            {errorMessage && <span className="error_message">{errorMessage}</span>}
        </div>
    );
};
