import React, { useEffect, useState } from "react";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";
import { FilterCriteriaOperator } from "../../api/generalService/types";
import { FieldValues, UseFormWatch } from "react-hook-form";

export const OptionDropdown: React.FC<{
  options: FilterCriteriaOperator[];
  id: string;
  isDisabled?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
}> = ({ id, isDisabled, options, watch, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = watch?.(`${id}.operation`);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: FilterCriteriaOperator) => {
    setValue(`${id}.operation`, option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!selectedOption) {
      setValue(`${id}.operation`, options[0]);
    }
  }, [selectedOption, id, options]);

  return (
    <div className="operation_input_wrapper">
      <div className="select">
        <button className="select_button" onClick={handleToggle} disabled={isDisabled}>
          {selectedOption}
        </button>
        {isOpen && (
          <ul className="select_options">
            {options.map((option, index) => (
              <li key={`${index}_option_${id}`} className="option" onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
