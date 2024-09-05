import React, { useEffect, useState } from "react";
import "../../styles/utils.css";
import "../../styles/form.css";
import { FieldValues, UseFormWatch } from "react-hook-form";

export const FormDropdown: React.FC<{
  options: (string | number)[];
  id: string;
  isDisabled?: boolean;
  watch: UseFormWatch<FieldValues>;
  setValue: any;
}> = ({ id, isDisabled, options, watch, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = watch?.(id);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string | number) => {
    setValue(id, option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!selectedOption) {
      setValue(id, options[0]);
    }
  }, [selectedOption, options, id, setValue]);

  return (
    <div className="dropdown_wrapper">
      <div className="select full_width">
        <button className="select_button text_align_left" onClick={handleToggle} disabled={isDisabled}>
          {selectedOption}
        </button>
        {isOpen && (
          <ul className="select_options">
            {options.map((option, index) => (
              <li key={`${index}_option_${id}`} className="option text_align_left" onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
