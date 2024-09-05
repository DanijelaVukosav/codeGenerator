import React from "react";
import { FilterCriteriaOperator } from "../../api/generalService/types";
import { FieldValues, UseFormWatch } from "react-hook-form";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";
import { OptionDropdown } from "./OptionDropdown";

interface FilterOperationDropdownProps {
  id: string;
  isDisabled?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
}

const STRING_FILTER_FILTER_OPTIONS_ARRAY = [FilterCriteriaOperator.EQUALS, FilterCriteriaOperator.CONTAINS];

export const StringFilterOperationDropdown: React.FunctionComponent<FilterOperationDropdownProps> = ({ id, isDisabled, watch, setValue }) => {
  return <OptionDropdown id={id} isDisabled={isDisabled} watch={watch} setValue={setValue} options={STRING_FILTER_FILTER_OPTIONS_ARRAY} />;
};
