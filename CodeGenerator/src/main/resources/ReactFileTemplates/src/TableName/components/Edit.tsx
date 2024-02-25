import React, { FC, useEffect, useState } from "react";
import * as toastr from "toastr";
import { History } from "history";
import { {FL_TABLE_NAME} } from "../types";
import BaseService from "../../generalService/Service";
import { {TABLE_FORM} } from "./{TABLE_FORM}";
import {TABLE_SERVICE}, { {DEFAULT_TABLE_OBJECT} } from "../service/{TABLE_SERVICE}";
import { useHistory, useParams } from "react-router-dom";
{IMPORT_TABLE_SERVICE_FOREIGN_KEYS}
{IMPORT_FORM_OF_FOREIGN_TABLES}


export const {EDIT_TABLE_NAME}: FC<{ idObject?: number }> = ({ idObject }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [object, setObject] = useState<{FL_TABLE_NAME}>({DEFAULT_TABLE_OBJECT});

  const onFieldValueChange = (fieldName: string, value: string) => {
    const nextState = {
      ...object,
      [fieldName]: value,
    };

    setObject(nextState);
  };

  useEffect(() => {
    {TABLE_SERVICE}.getById(idObject?.toString() ?? id?.toString() ?? "").then((data) => {
      data && setObject(data);
    });
  }, []);

  const onSave = () => {
    return {TABLE_SERVICE}.update(object, idObject ?? id).then((object) => {
      object && setObject(object);
      history.goBack();
    });
  };
  
  {ON_SAVE_FOREIGN_OBJECT}
  {ON_CHANGE_FIELD_FOREIGN_OBJECT}

  return (
    < {TABLE_FORM} object = { object } onChange = { onFieldValueChange } onSave = { onSave } >
    {FORM_OF_FOREIGN_TABLES}
{/*<span></span>*/}
    </{TABLE_FORM}>
  );
};
