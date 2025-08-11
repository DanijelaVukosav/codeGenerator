import * as React from 'react';
import { TableColumnType } from '../types';
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    FieldErrors,
    Path,
    FieldError
} from 'react-hook-form';
import { FormInputField } from './FormInputField';
import { CustomObjectType } from '../../api/generalService/types';

interface FormBodyProps<TValue extends CustomObjectType> {
    fields: TableColumnType[];
    register: UseFormRegister<TValue>;
    setValue: UseFormSetValue<TValue>;
    watch: UseFormWatch<TValue>;
    errors: FieldErrors<TValue>;
    isEditMode: boolean;
    multiselectOptions?: Record<string, string[]>;
}

export const FormBody = <TValue extends CustomObjectType>({
    fields,
    register,
    watch,
    setValue,
    errors,
    isEditMode,
    multiselectOptions
}: FormBodyProps<TValue>) => {
    return (
        <React.Fragment>
            {fields.map((columnSettings) => {
                if (
                    !columnSettings.formProperties?.isVisible ||
                    (isEditMode && columnSettings.formProperties.isHiddenOnEditing)
                ) {
                    return <React.Fragment key={`${columnSettings.key}_form_field_value`} />;
                }

                const fieldName = columnSettings.key as Path<TValue>;
                const rawError = errors?.[fieldName];
                const error = isFieldError(rawError) ? rawError : undefined;

                return (
                    <FormInputField
                        key={`${columnSettings.key}_form_field_value`}
                        name={fieldName}
                        label={columnSettings.label}
                        placeholder={columnSettings.placeholder}
                        type={columnSettings.type}
                        maxLength={columnSettings.formProperties?.maxLength}
                        minLength={columnSettings.formProperties?.minLength}
                        pattern={columnSettings.formProperties?.pattern}
                        patternMessage={columnSettings.formProperties?.patternMessage}
                        options={columnSettings.options}
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        required={columnSettings.formProperties?.required}
                        isDisabled={isEditMode && columnSettings.formProperties?.isDisabledEditing}
                        error={error}
                        columnOptions={multiselectOptions?.[columnSettings.key]}
                    />
                );
            })}
        </React.Fragment>
    );
};

function isFieldError(error: unknown): error is FieldError {
    return typeof error === 'object' && error !== null && 'type' in error;
}
