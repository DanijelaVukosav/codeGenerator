import * as React from "react";
import { COLUMN_TYPE, TableColumnType } from "../types";
import { DATE_FORMAT, DATE_TIME_FORMAT, formatDate } from "../../hooks/utilFunctions/formatDate";
import { FC, ReactNode } from "react";
import { isEmpty } from "lodash";

interface ObjectDetailsProps<TValue> {
  object?: TValue;
  fields: TableColumnType[];
  children?: ReactNode;
}

export const ObjectDetails = <TValue,>({ object, fields, children }: ObjectDetailsProps<TValue>) => {
  return !isEmpty(object) ? (
    <React.Fragment>
      <dl className="row">
        {fields.map((columnSettings) => {
          if (!columnSettings.isVisibleOnSinglePage) return <React.Fragment></React.Fragment>;

          return (
            <React.Fragment>
              <dt className="col-sm-3">{columnSettings.label}</dt>
              <dd className="col-sm-9">
                <FormattedDefinitionDataContent object={object} columnSettings={columnSettings} />
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

interface FormattedDefinitionDataContentProps {
  object: any;
  columnSettings: TableColumnType;
}

const FormattedDefinitionDataContent: FC<FormattedDefinitionDataContentProps> = ({ object, columnSettings }) => {
  switch (columnSettings.type) {
    case COLUMN_TYPE.CHECKBOX:
      return Boolean(object?.[columnSettings.key]) ? (
        <img src={"/svg/checkbox-checked.svg"} style={{ height: "24px" }} alt={"checked"} />
      ) : (
        <img src={"/svg/no-icon.svg"} style={{ height: "24px" }} alt={"x"} />
      );

    case COLUMN_TYPE.DATE:
      return (
        <dd>
          <p>
            {!object?.[columnSettings.key]
              ? "-"
              : typeof object?.[columnSettings.key] === "string"
                ? formatDate(new Date(object?.[columnSettings.key]), DATE_FORMAT)
                : formatDate(object?.[columnSettings.key], DATE_FORMAT)}{" "}
          </p>
        </dd>
      );
    case COLUMN_TYPE.DATE_TIME:
      return (
        <dd>
          <p>
            {!object?.[columnSettings.key]
              ? "-"
              : typeof object?.[columnSettings.key] === "string"
                ? formatDate(new Date(object?.[columnSettings.key]), DATE_TIME_FORMAT)
                : formatDate(object?.[columnSettings.key], DATE_TIME_FORMAT)}{" "}
          </p>
        </dd>
      );
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
          <p>{object?.[columnSettings.key]}</p>
        </dd>
      );
  }
};
