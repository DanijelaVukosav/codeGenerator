import React, { FC } from 'react';
import { COLUMN_TYPE, TableColumnType } from '../types';
import { FILTER_DATE_END, FILTER_DATE_START, FilterCriteria } from '../../api/generalService/types';
import '../../styles/utils.css';
import '../../styles/filterContainer.css';
import { FilterInputField } from './FilterInputField';
import { FilterCheckboxField } from './FilterCheckboxField';
import { FilterNumberInputField } from './FilterNumberInputField';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from 'react-hook-form';
import { FilterSelectField } from './FilterSelectField';

interface TableFilterFieldsProps {
    columnsSettings: TableColumnType[];
    predefinedFilterCriteria?: FilterCriteria;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;

    onSubmitForm: () => void | Promise<void>;
    clearFilterForm: () => void;
}

export const TableFilterFields: React.FC<TableFilterFieldsProps> = ({
    columnsSettings,
    predefinedFilterCriteria,
    register,
    errors,
    watch,
    setValue,
    onSubmitForm,
    clearFilterForm
}) => {
    return (
        <>
            {columnsSettings.map((columnSettings) => {
                const error = errors[columnSettings.key];
                const errorMsg = error && 'message' in error ? (error.message as string) : '';
                switch (columnSettings.type) {
                    case COLUMN_TYPE.DATE:
                        return (
                            <React.Fragment key={columnSettings.key}>
                                <FilterInputField
                                    id={`${FILTER_DATE_START}${columnSettings.key}`}
                                    register={register}
                                    label={`Start - ${columnSettings.label}:`}
                                    type={'date'}
                                    watch={watch}
                                    setValue={setValue}
                                    errorMessage={errorMsg}
                                />
                                <FilterInputField
                                    id={`${FILTER_DATE_END}${columnSettings.key}`}
                                    register={register}
                                    label={`End - ${columnSettings.label}:`}
                                    type={'date'}
                                    watch={watch}
                                    setValue={setValue}
                                    errorMessage={errorMsg}
                                />
                            </React.Fragment>
                        );
                    case COLUMN_TYPE.DATE_TIME:
                        return (
                            <React.Fragment key={columnSettings.key}>
                                <FilterInputField
                                    id={`${FILTER_DATE_START}${columnSettings.key}`}
                                    register={register}
                                    label={`Start - ${columnSettings.label}:`}
                                    type={'datetime-local'}
                                    watch={watch}
                                    setValue={setValue}
                                    errorMessage={errorMsg}
                                />
                                <FilterInputField
                                    id={`${FILTER_DATE_END}${columnSettings.key}`}
                                    register={register}
                                    label={`End - ${columnSettings.label}:`}
                                    type={'datetime-local'}
                                    watch={watch}
                                    setValue={setValue}
                                    errorMessage={errorMsg}
                                />
                            </React.Fragment>
                        );
                    case COLUMN_TYPE.CHECKBOX:
                        return (
                            <FilterCheckboxField
                                key={columnSettings.key}
                                id={columnSettings.key}
                                register={register}
                                label={columnSettings.label}
                            />
                        );
                    case COLUMN_TYPE.NUMBER:
                        return (
                            <FilterNumberInputField
                                key={columnSettings.key}
                                id={columnSettings.key}
                                register={register}
                                label={`${columnSettings.label}:`}
                                type={columnSettings.type}
                                placeholder={columnSettings.placeholder}
                                disabled={columnSettings.key === predefinedFilterCriteria?.key}
                                errorMessage={errorMsg}
                                watch={watch}
                                setValue={setValue}
                            />
                        );
                    case COLUMN_TYPE.ENUM:
                        return (
                            <FilterSelectField
                                key={columnSettings.key}
                                id={columnSettings.key}
                                register={register}
                                label={`${columnSettings.label}:`}
                                options={columnSettings.options ?? []}
                                errorMessage={errorMsg}
                            />
                        );
                    default: {
                        const inputType = columnSettings.type as
                            | 'text'
                            | 'number'
                            | 'date'
                            | 'datetime'
                            | 'datetime-local'
                            | 'time';
                        return (
                            <FilterInputField
                                key={columnSettings.key}
                                id={columnSettings.key}
                                register={register}
                                label={`${columnSettings.label}:`}
                                type={inputType}
                                placeholder={columnSettings.placeholder}
                                errorMessage={errorMsg}
                                watch={watch}
                                setValue={setValue}
                            />
                        );
                    }
                }
            })}
            <SubmitButton onSubmitForm={onSubmitForm} />
            <ClearFormButton clearFilterForm={clearFilterForm} />
        </>
    );
};

const SubmitButton: FC<{ onSubmitForm: () => void | Promise<void> }> = ({ onSubmitForm }) => {
    return (
        <div className="filter_container">
            <div className="button_wrapper">
                <button type="submit" onClick={onSubmitForm}>
                    Filter
                </button>
            </div>
        </div>
    );
};

const ClearFormButton: FC<{ clearFilterForm: () => void }> = ({ clearFilterForm }) => {
    return (
        <div className="filter_container">
            <div className="button_wrapper">
                <button type="button" onClick={clearFilterForm} className="clear_button">
                    <img src="/svg/clear-filter.svg" alt="Filter" />
                    Clear
                </button>
            </div>
        </div>
    );
};
