import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { #{FUL_TABLE_NAME}#Columns } from "../types";
import "../../../styles/utils.css";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import { DeleteButton, EditButton, IndexTableActionCell, IndexTableRow } from "../../../generalComponents";
import { PATH_SEPARATOR } from "../../../api/generalService/types";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { TableRowContent } from "../../../generalComponents";

interface IProps {
  data: any;
  index: number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  const { onDelete#{FUL_TABLE_NAME}#, openEdit#{FUL_TABLE_NAME}#Modal, onRowSelect, selectedRowId, isEnabledTableActions } = useContext(#{FUL_TABLE_NAME}#Context);
  let navigate = useNavigate();

  const onRowClick = () => {
    if (onRowSelect) {
      onRowSelect?.(props.data);
      return;
    }
    navigate(APPLICATION_ROUTES.#{AUL_TABLE_NAME}# + PATH_SEPARATOR + props.data.#{TABLE_PRIMARY_KEY_COLUMN}#);
  };
  const isSelectedRow = selectedRowId && props.data.#{TABLE_PRIMARY_KEY_COLUMN}#.toString() === selectedRowId?.toString();

  return (
    <IndexTableRow onClick={onRowClick} className={isSelectedRow ? "selected_row" : ""}>
      <TableRowContent object={props?.data} fields={#{FUL_TABLE_NAME}#Columns} />
      {isEnabledTableActions && (
        <IndexTableActionCell className="flex_center">
          <EditButton onClick={() => openEdit#{FUL_TABLE_NAME}#Modal(props.data)} abilitySubject={"#{AUL_TABLE_NAME}#_UPDATE"} />
          &nbsp;
          <DeleteButton
            onClick={() => {
              props.data?.#{TABLE_PRIMARY_KEY_COLUMN}# && onDelete#{FUL_TABLE_NAME}#(props.data.#{TABLE_PRIMARY_KEY_COLUMN}#);
            }}
            abilitySubject={"#{AUL_TABLE_NAME}#_DELETE"}
          />
        </IndexTableActionCell>
      )}
    </IndexTableRow>
  );
};
export default TableRow;
