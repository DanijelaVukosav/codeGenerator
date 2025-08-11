import React, { useRef, useState } from 'react';
import '../../styles/dropdown.css';
import { FC } from 'react';

const Dropdown: FC<{
    options: string[];
    isPositionBottom?: boolean;
    defaultSelectedOption: string;
    onChange: (option: string) => void;
}> = ({ options, isPositionBottom = false, defaultSelectedOption, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(defaultSelectedOption);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className={`selected-option ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
                {selectedOption || 'Select an option'}
            </div>
            <div
                className={`options-container ${isPositionBottom ? 'bottom' : 'top'} ${isOpen ? 'show' : ''}`}>
                {options.map((option) => (
                    <div
                        key={option}
                        className={`option ${selectedOption === option ? 'selected' : ''}`}
                        onClick={() => handleSelect(option)}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;
