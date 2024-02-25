import * as React from "react";
import { FC } from "react";
import { Button } from "../../generalComponents";
import { GeneralInput } from "../../generalComponents/GeneralInput";
import {  {FL_TABLE_NAME} } from "../types";

type Props = {
  object: {FL_TABLE_NAME};
  onChange: (fieldName: string, value: string) => void;
  onSave: () => void;
  children?: JSX.Element[];
};

export const {TABLE_FORM}: FC<Props> = (props) => {
  return (
    <form>
      <h1>{FL_TABLE_NAME} form</h1>
      {INPUT_FIELDS_OF_TABLE}
      {props.children}
      <Button
        label="Save {FL_TABLE_NAME}"
        className="btn btn-success mt-2"
        onClick={props.onSave}
      />
    </form>
  );
};
