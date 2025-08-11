import React from 'react';
import { COLUMN_TYPE } from '../types';
import { FilterCriteriaOperator } from '../../api/generalService/types';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FilterCheckboxFieldProps<TFormValues extends FieldValues = FieldValues> {
    id: Path<TFormValues>;
    register: UseFormRegister<TFormValues>;
    label: string;
    disabled?: boolean;
}
export const FilterCheckboxField = <TFormValues extends FieldValues = FieldValues>({
    id,
    register,
    label,
    disabled
}: FilterCheckboxFieldProps<TFormValues>) => {
    return (
        <div className={'filter_container'}>
            <div className="checkbox_filter_container">
                <label className="filter_label" htmlFor={id}>
                    {label}
                </label>

                <div>
                    <input
                        title="Title"
                        type={'checkbox'}
                        id={id}
                        {...register(`${id}.value` as Path<TFormValues>)}
                        step={1}
                        disabled={disabled}
                        className="large_checkbox"
                    />
                    <input
                        type={'text'}
                        hidden={true}
                        className="filter_field input_padding"
                        id={`${id}-type`}
                        {...register(`${id}.type` as Path<TFormValues>)}
                        value={COLUMN_TYPE.CHECKBOX}
                    />
                    <input
                        hidden={true}
                        {...register(`${id}.operation` as Path<TFormValues>)}
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
