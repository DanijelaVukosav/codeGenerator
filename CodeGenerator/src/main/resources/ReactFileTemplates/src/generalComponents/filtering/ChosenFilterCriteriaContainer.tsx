import React from 'react';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { FilterCriteria, FilterCriteriaType } from '../../api/generalService/types';

interface Props {
    visible: boolean;
    chosenFilterCriteria: FilterCriteria[];
    onClick: (criteria: FilterCriteria) => void;
}

export const ChosenFilterCriteriaContainer: React.FunctionComponent<Props> = ({
    visible,
    chosenFilterCriteria,
    onClick
}) => {
    return visible ? (
        <div className="chosen_filter_criteria_container">
            {chosenFilterCriteria.map((filter: FilterCriteria) => {
                return (
                    <button
                        key={`chosen_filter_${filter.key}`}
                        onClick={() => onClick(filter)}
                        className="chosen_filter_criteria_button">
                        {filter.type === FilterCriteriaType.CHECKBOX
                            ? filter.key
                            : `${filter.key}: ${filter.value}(${filter.operation})`}
                        <img
                            src={'/svg/no-icon.svg'}
                            style={{ height: '24px', marginLeft: '10px' }}
                            alt={'x'}
                        />
                    </button>
                );
            })}
        </div>
    ) : (
        <React.Fragment />
    );
};
