import React, {FC} from "react";
import {COLUMN_TYPE, TableColumnType} from "../types";
import {FILTER_DATE_END, FILTER_DATE_START, FilterCriteria} from "../../api/generalService/types";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";
import {FilterInputField} from "./FilterInputField";
import {FilterCheckboxField} from "./FilterCheckboxField";
import {FilterNumberInputField} from "./FilterNumberInputField";
import {FieldErrors, FieldValues, UseFormSetValue, UseFormWatch} from "react-hook-form";

interface TableFilterFieldsProps {
    columnsSettings: TableColumnType[];
    predefinedFilterCriteria?: FilterCriteria;
    register: any;
    errors: FieldErrors;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;

    onSubmitForm: any;
    clearFilterForm: () => void;
}

export const TableFilterFields: React.FunctionComponent<TableFilterFieldsProps> = ({
                                                                                       columnsSettings,
                                                                                       predefinedFilterCriteria,
                                                                                       register,
                                                                                       errors,
                                                                                       watch,
                                                                                       setValue,
                                                                                       onSubmitForm,
                                                                                       clearFilterForm,
                                                                                   }) => {
    return (
        <React.Fragment>
            {columnsSettings.map((columnSettings) => {
                switch (columnSettings.type) {
                    case COLUMN_TYPE.DATE:
                    case COLUMN_TYPE.DATE_TIME:
                        return (
                            <React.Fragment key={`filter_field_${columnSettings.key}`}>
                                <FilterInputField
                                    id={`${FILTER_DATE_START}${columnSettings.key}`}
                                    register={register}
                                    label={`Start - ${columnSettings.label}:`}
                                    type={"date"}
                                    watch={watch}
                                    setValue={setValue}
                                />
                                <FilterInputField
                                    id={`${FILTER_DATE_END}${columnSettings.key}`}
                                    register={register}
                                    label={`End - ${columnSettings.label}:`}
                                    type={"datetime-local"}
                                    watch={watch}
                                    setValue={setValue}
                                />
                            </React.Fragment>
                        );
                    case COLUMN_TYPE.CHECKBOX:
                        return <FilterCheckboxField key={`filter_field_${columnSettings.key}`} id={columnSettings.key}
                                                    register={register} label={`${columnSettings.label}`}/>;
                    case COLUMN_TYPE.NUMBER:
                        return (
                            <FilterNumberInputField
                                key={`filter_field_${columnSettings.key}`}
                                id={columnSettings.key}
                                register={register}
                                label={`${columnSettings.label}:`}
                                type={columnSettings.type}
                                placeholder={columnSettings.placeholder}
                                disabled={columnSettings.key === predefinedFilterCriteria?.key}
                                errorMessage={((errors?.[columnSettings.key] as any)?.value?.message as string) ?? ""}
                                watch={watch}
                                setValue={setValue}
                            />
                        );
                    default:
                        return (
                            <FilterInputField
                                key={`filter_field_${columnSettings.key}`}
                                id={columnSettings.key}
                                register={register}
                                label={`${columnSettings.label}:`}
                                type={columnSettings.type}
                                placeholder={columnSettings.placeholder}
                                errorMessage={((errors?.[columnSettings.key] as any)?.value?.message as string) ?? ""}
                                watch={watch}
                                setValue={setValue}
                            />
                        );
                }
            })}
            <SubmitButton onSubmitForm={onSubmitForm}/>
            <ClearFormButton clearFilterForm={clearFilterForm}/>
        </React.Fragment>
    );
};

const SubmitButton: FC<{ onSubmitForm: any }> = ({onSubmitForm}) => {
    return (
        <div className="filter_container">
            <div className="button_wrapper">
                <button type={"submit"} onClick={onSubmitForm}>
                    Filter
                </button>
            </div>
        </div>
    );
};
const ClearFormButton: FC<{ clearFilterForm: () => void }> = ({clearFilterForm}) => {
    return (
        <div className="filter_container">
            <div className="button_wrapper">
                <button type={"submit"} onClick={clearFilterForm} className={"clear_button"}>
                    <img src={"/svg/clear-filter.svg"} alt={"Filter"}/>
                    Clear
                </button>
            </div>
        </div>
    );
};
