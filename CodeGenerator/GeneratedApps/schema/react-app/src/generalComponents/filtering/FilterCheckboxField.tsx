import React from "react";
import { COLUMN_TYPE } from "../types";
import { FilterCriteriaOperator } from "../../api/generalService/types";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";

interface FilterCheckboxFieldProps {
  id: string;
  register: any;
  label: string;
  disabled?: boolean;
}

export const FilterCheckboxField: React.FunctionComponent<FilterCheckboxFieldProps> = ({ id, register, label, disabled }) => {
  return (
    <div className={"filter_container"}>
      <div className="checkbox_filter_container">
        <label className="filter_label" htmlFor={id}>
          {label}
        </label>

        <div>
          <input title="Title" type={"checkbox"} id={id} {...register(`${id}.value`)} step="1" disabled={disabled} className="large_checkbox" />
          <input
            type={"text"}
            hidden={true}
            className="filter_field input_padding"
            id={id}
            {...register(`${id}.type`)}
            value={COLUMN_TYPE.CHECKBOX}
          />
          <input
            hidden={true}
            {...register(`${id}.operation`)}
            type="text"
            id={`${id}_equals`}
            value={FilterCriteriaOperator.EQUALS}
            defaultChecked={true}
          />
        </div>
      </div>
    </div>
  );
};
