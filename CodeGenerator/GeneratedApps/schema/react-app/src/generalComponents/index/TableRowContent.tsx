import * as React from "react";
import { COLUMN_TYPE, TableColumnType } from "../types";
import { DATE_FORMAT, DATE_TIME_FORMAT, formatDate } from "../../hooks/utilFunctions/formatDate";

interface TableRowContentProps {
  object: Record<string, any>;
  fields: TableColumnType[];
}

export const TableRowContent = ({ object, fields }: TableRowContentProps) => {
  return (
    <React.Fragment>
      {fields.map((columnSettings, index) => {
        if (!columnSettings.isVisibleOnTable) return <React.Fragment key={`row_${columnSettings.key}_${index}`}></React.Fragment>;
        switch (columnSettings.type) {
          case COLUMN_TYPE.CHECKBOX:
            return (
              <td key={`row_${columnSettings.key}_${index}`}>
                {Boolean(object?.[columnSettings.key]) ? (
                  <img src={"/svg/checkbox-checked.svg"} style={{ height: "24px" }} alt={"checked"} />
                ) : (
                  <img src={"/svg/no-icon.svg"} style={{ height: "24px" }} alt={"x"} />
                )}
              </td>
            );
          case COLUMN_TYPE.DATE:
            return (
              <td key={`row_${columnSettings.key}_${index}`}>
                {!object?.[columnSettings.key]
                  ? "-"
                  : typeof object?.[columnSettings.key] === "string"
                    ? formatDate(new Date(object?.[columnSettings.key]), DATE_FORMAT)
                    : formatDate(object?.[columnSettings.key], DATE_FORMAT)}{" "}
              </td>
            );
          case COLUMN_TYPE.DATE_TIME:
            return (
              <td key={`row_${columnSettings.key}_${index}`}>
                {!object?.[columnSettings.key]
                  ? "-"
                  : typeof object?.[columnSettings.key] === "string"
                    ? formatDate(new Date(object?.[columnSettings.key]), DATE_TIME_FORMAT)
                    : formatDate(object?.[columnSettings.key], DATE_TIME_FORMAT)}{" "}
              </td>
            );
          case COLUMN_TYPE.PASSWORD:
            return <td key={`row_${columnSettings.key}_${index}`}>*********</td>;
          case COLUMN_TYPE.TEXT:
          case COLUMN_TYPE.NUMBER:
          default:
            return <td key={`row_${columnSettings.key}_${index}`}>{object?.[columnSettings.key]}</td>;
        }
      })}
    </React.Fragment>
  );
};
