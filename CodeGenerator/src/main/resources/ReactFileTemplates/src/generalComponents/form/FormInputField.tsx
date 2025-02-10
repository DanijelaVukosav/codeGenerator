import * as React from "react";
import { FormErrorMessage } from "./FormComponents";
import { COLUMN_TYPE } from "../types";
import { UseFormWatch } from "react-hook-form";
import { FormDropdown } from "./FormDropdown";

interface FormInputFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: any;
  error?: { type: string; message: "" };
  step?: number;
  min?: number;
  max?: number;
  maxLength?: number;
  options?: (string | number)[];
  isDisabled?: boolean;
  register?: any;
  watch: UseFormWatch<any>;
  setValue: any;
  required?: boolean;
  columnOptions?: string[];
}

export const FormInputField: React.FunctionComponent<FormInputFieldProps> = ({
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
  columnOptions,
}) => {
  switch (type) {
    case COLUMN_TYPE.CHECKBOX: {
      return (
        <div className="input_container">
          <div className="checkbox_group">
            <input type="checkbox" className="input_field" style={{ marginRight: "5px" }} id={name} {...register(name)} value={value} />

            <label className="input_label" style={{ display: "inline-block", marginBottom: "5px" }} id={name}>
              {label}
            </label>
          </div>
        </div>
      );
    }
    case COLUMN_TYPE.MULTISELECT_CHECKBOX: {
      return (
        <div className="input_container">
          <div>
            <p className="input_label">{label}</p>
            <div className="checkbox_group">
              <input
                  type="checkbox"
                  className="input_field"
                  style={{marginRight: "5px"}}
                  id={`${name}_select_all`}
                  onChange={e => {
                    if (e.target.checked && columnOptions) {
                      setValue(name, [...columnOptions]);
                    } else {
                      setValue(name, []);
                    }
                  }}
              />

              <label className="input_label" style={{display: "inline-block", marginBottom: "5px"}}
                     id={`${name}_select_all`}>
                SELECT ALL
              </label>
            </div>
          </div>
          <div className="checkbox_wrapper">
            {columnOptions?.map((option) => {
              return (
                  <div className="checkbox_group">
                    <input
                        type="checkbox"
                        className="input_field"
                        style={{marginRight: "5px"}}
                        id={`${name}_${option}`}
                        {...register(name)}
                        value={option}
                        // defaultChecked={editUser?.permissions?.some((permiss: string) => {
                        //   return permiss === permission;
                        // })}
                    />

                    <label className="input_label" style={{display: "inline-block", marginBottom: "5px"}}
                           id={`${name}_${option}`}>
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
            {/*<input type="checkbox" className="input_field" style={{ marginRight: "5px" }} id={name} {...register(name)} value={value} />*/}

            <label className="input_label" style={{ display: "inline-block", marginBottom: "5px" }} id={name}>
              {label}
            </label>

            <FormDropdown id={name} isDisabled={isDisabled} watch={watch} setValue={setValue} options={options ?? []} />
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
            title="Inpit title"
            type={type}
            className="input_field input_padding"
            id={name}
            {...register(name, { required })}
            disabled={Boolean(isDisabled)}
            max={max}
            maxLength={maxLength}
            value={value}
          />
          {error?.type === "required" && <FormErrorMessage message={`${label} is required!`} />}
        </div>
      );
    }
  }
};
