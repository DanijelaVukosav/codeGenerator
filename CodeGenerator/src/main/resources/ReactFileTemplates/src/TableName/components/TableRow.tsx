import React from "react";
import { Link } from "react-router-dom";
import {TABLE_SERVICE}, { PATH_ROOT, PATH_SEPARATOR, } from "../service/{TABLE_SERVICE}";
import { {FL_TABLE_NAME} } from "../types";
import { useHistory } from "react-router-dom";

interface IProps {
  data: {FL_TABLE_NAME};
  index: number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  let history = useHistory();

  return (
    <tr onDoubleClick={() => history.push( PATH_ROOT + PATH_SEPARATOR + props.data.{TABLE_PRIMARY_KEY_COLUMN})}>
      <td>{props.index}</td>
      {TABLE_COLUMNS_IN_ROW}
      <td>
        <Link to={ PATH_ROOT + PATH_SEPARATOR + "edit" + PATH_SEPARATOR + props.data.{TABLE_PRIMARY_KEY_COLUMN}}
              className="btn btn-primary"
        >
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Link>
      </td>
      <td>
        <button
          onClick={async () => {
            await {TABLE_SERVICE}.delete(props.data.{TABLE_PRIMARY_KEY_COLUMN});
            window.location.reload();
          }}
          className="btn btn-danger"
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
