import React from 'react';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

interface FilterSelectFieldProps<TFormValues extends FieldValues = FieldValues> {
    id: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    label: string;
    options: (string | number)[];
    errorMessage?: string;
}

export const FilterSelectField = <TFormValues extends FieldValues = FieldValues>({
    id,
    register,
    label,
    options,
    errorMessage
}: FilterSelectFieldProps<TFormValues>) => {
    return (
        <div className="filter_container">
            <label className="filter_label" htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                {...register(`${id}.value` as Path<TFormValues>)}
                className="filter_field">
                <option value="">Select...</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {errorMessage && <span className="error_message">{errorMessage}</span>}
        </div>
    );
};
