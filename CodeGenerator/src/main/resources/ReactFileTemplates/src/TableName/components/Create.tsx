import React, { FC, useState } from "react";
import { {TABLE_FORM} } from "./{TABLE_FORM}";
import { {FL_TABLE_NAME} } from "../types";
import {TABLE_SERVICE}, { {DEFAULT_TABLE_OBJECT} } from "../service/{TABLE_SERVICE}";
import { useHistory } from "react-router-dom";
{IMPORT_TABLE_SERVICE_FOREIGN_KEYS}
{IMPORT_FORM_OF_FOREIGN_TABLES}


export const {CREATE_TABLE_NAME}: FC = () => {
  const history = useHistory();

  const [object, setObject] = useState<{FL_TABLE_NAME}>({DEFAULT_TABLE_OBJECT});

  const onFieldValueChange = (fieldName: string, value: string) => {
    const nextState = {
      ...object,
      [fieldName]: value,
    };
    setObject(nextState);
  };

  const onSave = () => {
    return {TABLE_SERVICE}.create(object).then(() => {
      setObject({DEFAULT_TABLE_OBJECT});
      history.goBack();
    });
  };
  {ON_SAVE_FOREIGN_OBJECT}
  {ON_CHANGE_FIELD_FOREIGN_OBJECT}

  return (
    < {TABLE_FORM} object = { object } onChange = { onFieldValueChange } onSave = { onSave } >
    {/* <span></span>*/}
    {FORM_OF_FOREIGN_TABLES}
    </{TABLE_FORM}>
  );
};
