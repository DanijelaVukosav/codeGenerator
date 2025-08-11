import * as React from 'react';
import { COLUMN_TYPE, TableColumnType } from '../types';
import { DATE_FORMAT, DATE_TIME_FORMAT, formatDate } from '../../hooks/utilFunctions/formatDate';
import { ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { CustomObjectType } from '../../api/generalService/types';

interface ObjectDetailsProps<TValue extends CustomObjectType> {
    object?: TValue;
    fields: TableColumnType[];
    children?: ReactNode;
}

export const ObjectDetails = <TValue extends CustomObjectType>({
    object,
    fields,
    children
}: ObjectDetailsProps<TValue>) => {
    return object && !isEmpty(object) ? (
        <React.Fragment>
            <dl className="row">
                {fields.map((columnSettings) => {
                    if (!columnSettings.isVisibleOnSinglePage) {
                        return (
                            <React.Fragment
                                key={`${columnSettings.key}_field_value`}></React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment key={`${columnSettings.key}_field_value`}>
                            <dt className="col-sm-3">{columnSettings.label}</dt>
                            <dd className="col-sm-9">
                                <FormattedDefinitionDataContent<TValue>
                                    object={object}
                                    columnSettings={columnSettings}
                                />
                            </dd>
                        </React.Fragment>
                    );
                })}
                {children}
            </dl>
        </React.Fragment>
    ) : (
        <React.Fragment />
    );
};

interface FormattedDefinitionDataContentProps<TValue extends CustomObjectType> {
    object: TValue;
    columnSettings: TableColumnType;
}

const FormattedDefinitionDataContent = <TValue extends CustomObjectType>({
    object,
    columnSettings
}: FormattedDefinitionDataContentProps<TValue>) => {
    switch (columnSettings.type) {
        case COLUMN_TYPE.CHECKBOX:
            return Boolean(object?.[columnSettings.key]) ? (
                <img src={'/svg/checkbox-checked.svg'} style={{ height: '24px' }} alt={'checked'} />
            ) : (
                <img src={'/svg/no-icon.svg'} style={{ height: '24px' }} alt={'x'} />
            );

        case COLUMN_TYPE.DATE:
        case COLUMN_TYPE.DATE_TIME: {
            const rawValue = object?.[columnSettings.key];

            if (!rawValue) {
                return (
                    <dd>
                        <p>-</p>
                    </dd>
                );
            }

            const parsedDate =
                typeof rawValue === 'string' || typeof rawValue === 'number'
                    ? new Date(rawValue)
                    : rawValue instanceof Date
                      ? rawValue
                      : undefined;

            const formattedDate = parsedDate
                ? formatDate(
                      parsedDate,
                      columnSettings.type === COLUMN_TYPE.DATE ? DATE_FORMAT : DATE_TIME_FORMAT
                  )
                : '-';

            return (
                <dd>
                    <p>{formattedDate}</p>
                </dd>
            );
        }
        case COLUMN_TYPE.PASSWORD:
            return (
                <dd>
                    <p>*********</p>
                </dd>
            );
        case COLUMN_TYPE.TEXT:
        case COLUMN_TYPE.NUMBER:
        default:
            return (
                <dd>
                    <p>{object?.[columnSettings.key]?.toString()}</p>
                </dd>
            );
    }
};
