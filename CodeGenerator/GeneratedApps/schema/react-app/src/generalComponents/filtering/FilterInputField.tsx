import React, { useMemo } from "react";
import { StringFilterOperationDropdown } from "./StringFilterOperationDropdown";
import { FieldValues, UseFormWatch } from "react-hook-form";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";
import { TimeFilterOperationDropdown } from "./TimeFilterOperationDropdown";

interface FilterInputFieldProps {
  id: string;
  register: any;
  type: string;
  placeholder?: string;
  label: string;
  disabled?: boolean;
  errorMessage?: string | undefined;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
}

export const FilterInputField: React.FunctionComponent<FilterInputFieldProps> = ({
  id,
  register,
  type,
  placeholder,
  label,
  disabled,
  errorMessage,
  watch,
  setValue,
}) => {
  const simpleInput = useMemo(() => type === "date" || type === "datetime" || type === "datetime-local", [type]);
  return (
    <div className="filter_container">
      <label className="filter_label" htmlFor={id}>
        {label}
      </label>

      <div className={simpleInput ? "" : `operation_input_wrapper`}>
        <input
          placeholder={placeholder}
          title="Title"
          type={type}
          className="filter_field input_padding"
          id={id}
          {...register(`${id}.value`)}
          step="1"
          disabled={disabled}
        />
        <input type={"text"} hidden={true} className="filter_field input_padding" id={id} {...register(`${id}.type`)} value={type} />
        {type === "text" && <StringFilterOperationDropdown id={id} isDisabled={disabled} setValue={setValue} watch={watch} />}
        {type === "time" && <TimeFilterOperationDropdown id={id} isDisabled={disabled} setValue={setValue} watch={watch} />}
      </div>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};
