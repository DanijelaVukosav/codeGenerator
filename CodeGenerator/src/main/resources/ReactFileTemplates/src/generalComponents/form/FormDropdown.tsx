import React, { useEffect, useState } from 'react';
import '../../styles/utils.css';
import '../../styles/form.css';
import { FieldValues, Path, UseFormWatch, UseFormSetValue, PathValue } from 'react-hook-form';

interface FormDropdownProps<TFormValues extends FieldValues = FieldValues> {
  options: (string | number)[];
  id: Path<TFormValues>;
  isDisabled?: boolean;
  watch: UseFormWatch<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
}

export const FormDropdown = <TFormValues extends FieldValues = FieldValues>({
                                                                              id,
                                                                              isDisabled,
                                                                              options,
                                                                              watch,
                                                                              setValue
                                                                            }: FormDropdownProps<TFormValues>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = watch(id);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string | number) => {
    setValue(id, option as PathValue<TFormValues, Path<TFormValues>>);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedOption === undefined || selectedOption === null) {
      setValue(id, options[0] as PathValue<TFormValues, Path<TFormValues>>);
    }
  }, [selectedOption, options, id, setValue]);

  return (
      <div className="dropdown_wrapper">
        <div className="select full_width">
          <button
              className="select_button text_align_left"
              onClick={handleToggle}
              disabled={isDisabled}>
            {selectedOption ?? 'Select...'}
          </button>
          {isOpen && (
              <ul className="select_options">
                {options.map((option, index) => (
                    <li
                        key={`${index}_option_${id}`}
                        className="option text_align_left"
                        onClick={() => handleOptionSelect(option)}>
                      {option}
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
};
