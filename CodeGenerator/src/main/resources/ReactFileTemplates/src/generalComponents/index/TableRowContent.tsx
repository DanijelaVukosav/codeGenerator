import * as React from 'react';
import { COLUMN_TYPE, TableColumnType } from '../types';
import { DATE_FORMAT, DATE_TIME_FORMAT, formatDate } from '../../hooks/utilFunctions/formatDate';
import { CustomAnyType } from '../../api/generalService/types';

interface TableRowContentProps {
    object: Record<string, CustomAnyType>;
    fields: TableColumnType[];
}

export const TableRowContent = ({ object, fields }: TableRowContentProps) => {
    return (
        <React.Fragment>
            {fields.map((columnSettings) => {
                if (!columnSettings.isVisibleOnTable) {
                    return (
                        <React.Fragment key={`${columnSettings.key}_table_view`}></React.Fragment>
                    );
                }
                switch (columnSettings.type) {
                    case COLUMN_TYPE.CHECKBOX:
                        return (
                            <td>
                                {Boolean(object?.[columnSettings.key]) ? (
                                    <img
                                        src={'/svg/checkbox-checked.svg'}
                                        style={{ height: '24px' }}
                                        alt={'checked'}
                                    />
                                ) : (
                                    <img
                                        src={'/svg/no-icon.svg'}
                                        style={{ height: '24px' }}
                                        alt={'x'}
                                    />
                                )}
                            </td>
                        );
                    case COLUMN_TYPE.DATE:
                    case COLUMN_TYPE.DATE_TIME: {
                        const rawValue = object?.[columnSettings.key];

                        if (!rawValue) {
                            return <td>-</td>;
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
                                  columnSettings.type === COLUMN_TYPE.DATE
                                      ? DATE_FORMAT
                                      : DATE_TIME_FORMAT
                              )
                            : '-';

                        return <td>{formattedDate} </td>;
                    }
                    case COLUMN_TYPE.PASSWORD:
                        return <td>*********</td>;
                    case COLUMN_TYPE.TEXT:
                    case COLUMN_TYPE.NUMBER:
                    default:
                        return <td>{object?.[columnSettings.key]?.toString()}</td>;
                }
            })}
        </React.Fragment>
    );
};
