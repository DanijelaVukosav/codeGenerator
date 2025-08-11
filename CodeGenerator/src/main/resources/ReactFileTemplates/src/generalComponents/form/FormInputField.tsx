import * as React from 'react';
import { FormErrorMessage } from './FormComponents';
import { COLUMN_TYPE } from '../types';
import {
    UseFormRegister,
    UseFormWatch,
    FieldValues,
    Path,
    UseFormSetValue,
    PathValue,
    FieldError
} from 'react-hook-form';
import { FormDropdown } from './FormDropdown';
import { CustomAnyType } from '../../api/generalService/types';

interface FormInputFieldProps<TFormValues extends FieldValues = FieldValues> {
    type: string;
    name: Path<TFormValues>;
    label: string;
    placeholder?: string;
    value?: CustomAnyType;
    error?: FieldError;
    step?: number;
    min?: number;
    max?: number;
    maxLength?: number;
    options?: (string | number)[];
    isDisabled?: boolean;
    register: UseFormRegister<TFormValues>;
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
    required?: boolean;
    columnOptions?: string[];
}

export const FormInputField = <TFormValues extends FieldValues = FieldValues>({
    label,
    type,
    name,
    placeholder,
    value,
    max,
    maxLength,
    options,
    isDisabled,
    register,
    watch,
    setValue,
    required,
    error,
    columnOptions
}: FormInputFieldProps<TFormValues>) => {
    console.log(value);
    switch (type) {
        case COLUMN_TYPE.CHECKBOX: {
            return (
                <div className="input_container">
                    <div className="checkbox_group">
                        <input
                            type="checkbox"
                            className="input_field"
                            style={{ marginRight: '5px' }}
                            id={name}
                            {...register(name)}
                        />

                        <label
                            className="input_label"
                            style={{ display: 'inline-block', marginBottom: '5px' }}
                            htmlFor={name}>
                            {label}
                        </label>
                    </div>
                </div>
            );
        }
        case COLUMN_TYPE.MULTISELECT_CHECKBOX: {
            const currentValues = watch(name) || [];

            return (
                <div className="input_container">
                    <div>
                        <p className="input_label">{label}</p>
                        <div className="checkbox_group">
                            <input
                                type="checkbox"
                                className="input_field"
                                style={{ marginRight: '5px' }}
                                id={`${name}_select_all`}
                                checked={
                                    columnOptions
                                        ? currentValues.length === columnOptions.length
                                        : false
                                }
                                onChange={(e) => {
                                    if (e.target.checked && columnOptions) {
                                        setValue(name, [...columnOptions] as PathValue<
                                            TFormValues,
                                            Path<TFormValues>
                                        >);
                                    } else {
                                        setValue(
                                            name,
                                            [] as PathValue<TFormValues, Path<TFormValues>>
                                        );
                                    }
                                }}
                            />

                            <label
                                className="input_label"
                                style={{ display: 'inline-block', marginBottom: '5px' }}
                                htmlFor={`${name}_select_all`}>
                                SELECT ALL
                            </label>
                        </div>
                    </div>
                    <div className="checkbox_wrapper">
                        {columnOptions?.map((option) => {
                            return (
                                <div key={`form_${option}_value`} className="checkbox_group">
                                    <input
                                        type="checkbox"
                                        className="input_field"
                                        style={{ marginRight: '5px' }}
                                        id={`${name}_${option}`}
                                        {...register(name)}
                                        value={option}
                                    />

                                    <label
                                        className="input_label"
                                        style={{ display: 'inline-block', marginBottom: '5px' }}
                                        htmlFor={`${name}_${option}`}>
                                        {option}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        case COLUMN_TYPE.ENUM: {
            return (
                <div className="input_container">
                    <div className="">
                        <label
                            className="input_label"
                            style={{ display: 'inline-block', marginBottom: '5px' }}
                            htmlFor={name}>
                            {label}
                        </label>

                        <FormDropdown
                            id={name}
                            isDisabled={isDisabled}
                            watch={watch}
                            setValue={setValue}
                            options={options ?? []}
                        />
                    </div>
                </div>
            );
        }
        default: {
            return (
                <div className="input_container">
                    <label className="input_label" htmlFor={name}>
                        {label}
                    </label>
                    <input
                        placeholder={placeholder}
                        title="Input title"
                        type={type}
                        className="input_field input_padding"
                        id={name}
                        {...register(name, { required })}
                        disabled={Boolean(isDisabled)}
                        max={max}
                        maxLength={maxLength}
                    />
                    {error?.type === 'required' && (
                        <FormErrorMessage message={`${label} is required!`} />
                    )}
                </div>
            );
        }
    }
};
