import React, { useEffect, useState } from 'react';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { FilterCriteriaOperator } from '../../api/generalService/types';
import { FieldValues, UseFormWatch, UseFormSetValue, Path, PathValue } from 'react-hook-form';

interface OptionDropdownProps<TFormValues extends FieldValues = FieldValues> {
    options: FilterCriteriaOperator[];
    id: Path<TFormValues>;
    isDisabled?: boolean;
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}

export const OptionDropdown = <TFormValues extends FieldValues = FieldValues>({
    id,
    isDisabled,
    options,
    watch,
    setValue
}: OptionDropdownProps<TFormValues>) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedObject = watch(id);
    const selectedOption = selectedObject ? selectedObject.operation : '';

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: FilterCriteriaOperator) => {
        setValue(
            `${id}.operation` as Path<TFormValues>,
            option as PathValue<TFormValues, Path<TFormValues>>
        );
        setIsOpen(false);
    };

    useEffect(() => {
        if (!selectedOption) {
            setValue(
                `${id}.operation` as Path<TFormValues>,
                options[0] as PathValue<TFormValues, Path<TFormValues>>
            );
        }
    }, [selectedOption, id, options, setValue]);

    return (
        <div className="operation_input_wrapper">
            <div className="select">
                <button className="select_button" onClick={handleToggle} disabled={isDisabled}>
                    {selectedOption}
                </button>
                {isOpen && (
                    <ul className="select_options">
                        {options.map((option, index) => (
                            <li
                                key={`${index}_option_${id}`}
                                className="option"
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
