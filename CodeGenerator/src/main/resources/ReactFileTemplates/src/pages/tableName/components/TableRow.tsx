import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { #{FUL_TABLE_NAME}#, #{FUL_TABLE_NAME}#Columns } from "../types";
import "../../../styles/utils.css";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import { DeleteButton, EditButton, IndexTableActionCell, IndexTableRow } from "../../../generalComponents";
import { PATH_SEPARATOR } from "../../../api/generalService/types";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { TableRowContent } from "../../../generalComponents";

interface TableRowProps {
  data: #{FUL_TABLE_NAME}#;
  index: number;
}

const TableRow: React.FunctionComponent<TableRowProps> = ({ data }) => {
  const { onDelete#{FUL_TABLE_NAME}#, openEdit#{FUL_TABLE_NAME}#Modal, onRowSelect, selectedRowId, isEnabledTableActions } = useContext(#{FUL_TABLE_NAME}#Context);
  const navigate = useNavigate();

  const onRowClick = useCallback(() => {
    if (onRowSelect) {
      onRowSelect?.(data);
      return;
    }
    navigate(APPLICATION_ROUTES.#{AUL_TABLE_NAME}# + PATH_SEPARATOR + data.#{TABLE_PRIMARY_KEY_COLUMN}#);
  },[data, onRowSelect]);

  const isSelectedRow = selectedRowId && data.#{TABLE_PRIMARY_KEY_COLUMN}#?.toString() === selectedRowId?.toString();

  const onEdit = useCallback(
      () => openEdit#{FUL_TABLE_NAME}#Modal(data),
      [data, openEdit#{FUL_TABLE_NAME}#Modal]
  );

  const onDelete = useCallback(() => {
    if (data?.id) {
      onDelete#{FUL_TABLE_NAME}#(data.id);
    }
  }, [data, onDelete#{FUL_TABLE_NAME}#]);

  return (
    <IndexTableRow onClick={onRowClick} className={isSelectedRow ? "selected_row" : ""}>
      <TableRowContent object={data} fields={#{FUL_TABLE_NAME}#Columns} />
      {isEnabledTableActions && (
        <IndexTableActionCell className="flex_center">
          <EditButton onClick={onEdit} abilitySubject={"#{AUL_TABLE_NAME}#_UPDATE"} />
          &nbsp;
          <DeleteButton
            onClick={onDelete}
            abilitySubject={"#{AUL_TABLE_NAME}#_DELETE"}
          />
        </IndexTableActionCell>
      )}
    </IndexTableRow>
  );
};
export default TableRow;
