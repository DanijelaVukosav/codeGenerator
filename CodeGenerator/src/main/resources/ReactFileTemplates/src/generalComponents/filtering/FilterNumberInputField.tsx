import { FieldValues, UseFormWatch } from "react-hook-form";
import React from "react";
import { OptionDropdown } from "./OptionDropdown";
import { FilterCriteriaOperator } from "../../api/generalService/types";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";

const NUMBER_INPUT_FIELD_REGEX = /^-?\d+$/; // Regex for single number
const INTERVAL_NUMBER_INPUT_FIELD_REGEX = /^-?\d+--?\d+$/; // Regex for interval
interface FilterNumberInputFieldProps {
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

export const FilterNumberInputField: React.FunctionComponent<FilterNumberInputFieldProps> = ({
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
  const operation = watch?.(`${id}.operation`);

  return (
    <div className="filter_container">
      <label className="filter_label" htmlFor={id}>
        {label}
      </label>

      <div className={`operation_input_wrapper`}>
        <input
          placeholder={placeholder}
          title="Title"
          type={"text"}
          className="filter_field input_padding"
          id={id}
          {...register(`${id}.value`, {
            pattern: {
              value: operation === FilterCriteriaOperator.INTERVAL ? INTERVAL_NUMBER_INPUT_FIELD_REGEX : NUMBER_INPUT_FIELD_REGEX, // Regex za broj ili interval brojeva koji mogu biti negativni
              message:
                operation === FilterCriteriaOperator.INTERVAL
                  ? "Please enter a valid interval (e.g., 5, -5, 5-10, -5--10, -10-5)"
                  : "Please enter a valid number (e.g., 5, -5, 5.1)",
            },
          })}
          step="1"
          disabled={disabled}
        />
        <input type={"text"} hidden={true} className="filter_field input_padding" id={id} {...register(`${id}.type`)} value={type} />
        <NumberFilterOperationDropdown id={id} isDisabled={disabled} setValue={setValue} watch={watch} />
      </div>
      {errorMessage && <span className="error_message">{errorMessage}</span>}
    </div>
  );
};

interface FilterNumberOperationDropdownProps {
  id: string;
  isDisabled?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
}

const NUMBER_FILTER_FILTER_OPTIONS_ARRAY = [
  FilterCriteriaOperator.EQUALS,
  FilterCriteriaOperator.LESS_THEN,
  FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
  FilterCriteriaOperator.MORE_THEN,
  FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
  FilterCriteriaOperator.INTERVAL,
  FilterCriteriaOperator.CONTAINS,
];

export const NumberFilterOperationDropdown: React.FunctionComponent<FilterNumberOperationDropdownProps> = ({ id, isDisabled, watch, setValue }) => {
  return <OptionDropdown id={id} isDisabled={isDisabled} watch={watch} setValue={setValue} options={NUMBER_FILTER_FILTER_OPTIONS_ARRAY} />;
};
