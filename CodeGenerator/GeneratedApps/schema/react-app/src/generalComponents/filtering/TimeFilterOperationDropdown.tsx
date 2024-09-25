import { FieldValues, UseFormWatch } from "react-hook-form";
import React from "react";
import { FilterCriteriaOperator } from "../../api/generalService/types";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";
import { OptionDropdown } from "./OptionDropdown";

interface TimeFilterOperationDropdownProps {
  id: string;
  isDisabled?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
}

const TIME_FILTER_FILTER_OPTIONS_ARRAY = [
  FilterCriteriaOperator.EQUALS,
  FilterCriteriaOperator.LESS_THEN,
  FilterCriteriaOperator.EQUALS_OR_LESS_THEN,
  FilterCriteriaOperator.MORE_THEN,
  FilterCriteriaOperator.EQUALS_OR_MORE_THEN,
];

export const TimeFilterOperationDropdown: React.FunctionComponent<TimeFilterOperationDropdownProps> = ({ id, isDisabled, watch, setValue }) => {
  return <OptionDropdown id={id} isDisabled={isDisabled} watch={watch} setValue={setValue} options={TIME_FILTER_FILTER_OPTIONS_ARRAY} />;
};
