import * as React from "react";
import { TableColumnType } from "../types";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormInputField } from "./FormInputField";

interface FormBodyProps<TValue> {
  fields: TableColumnType[];
  register: UseFormRegister<TValue>;
  setValue: any;
  watch: UseFormWatch<TValue>;
  errors: FieldErrors<TValue>;
  isEditMode: boolean;
  multiselectOptions?: Record<string, string[]>;
}

export const FormBody = <TValue,>({ fields, register, watch, setValue, errors, isEditMode, multiselectOptions }: FormBodyProps<TValue>) => {
  return (
    <React.Fragment>
      {fields.map((columnSettings) => {
        if (!columnSettings.formProperties?.isVisible || (isEditMode && columnSettings.formProperties.isHiddenOnEditing)) return <React.Fragment />;
        return (
          <FormInputField
            name={columnSettings.key}
            label={columnSettings.label}
            placeholder={columnSettings.placeholder}
            type={columnSettings.type}
            maxLength={columnSettings.formProperties?.maxLength}
            options={columnSettings.options}
            register={register}
            watch={watch}
            setValue={setValue}
            required={columnSettings.formProperties?.required}
            isDisabled={isEditMode && columnSettings.formProperties?.isDisabledEditing}
            error={(errors as any)?.[columnSettings.key]}
            columnOptions={multiselectOptions?.[columnSettings.key]}
          />
        );
      })}
    </React.Fragment>
  );
};
