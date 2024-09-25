import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProizvodiColumns } from "../types";
import "../../../styles/utils.css";
import { ProizvodiContext } from "../service/ProizvodiContext";
import { DeleteButton, EditButton, IndexTableActionCell, IndexTableRow } from "../../../generalComponents";
import { PATH_SEPARATOR } from "../../../api/generalService/types";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { TableRowContent } from "../../../generalComponents";

interface IProps {
  data: any;
  index: number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  const { onDeleteProizvodi, openEditProizvodiModal, onRowSelect, selectedRowId, isEnabledTableActions } = useContext(ProizvodiContext);
  let navigate = useNavigate();

  const onRowDoubleClick = () => {
    if (onRowSelect) {
      onRowSelect?.(props.data);
      return;
    }
    navigate(APPLICATION_ROUTES.PROIZVODI + PATH_SEPARATOR + props.data.id);
  };
  const isSelectedRow = selectedRowId && props.data.id.toString() === selectedRowId?.toString();

  return (
    <IndexTableRow onDoubleClick={onRowDoubleClick} className={isSelectedRow ? "selected_row" : ""}>
      <TableRowContent object={props?.data} fields={ProizvodiColumns} />
      {isEnabledTableActions && (
        <IndexTableActionCell className="flex_center">
          <EditButton onClick={() => openEditProizvodiModal(props.data)} abilitySubject={"PROIZVODI_UPDATE"} />
          &nbsp;
          <DeleteButton
            onClick={() => {
              props.data?.id && onDeleteProizvodi(props.data.id);
            }}
            abilitySubject={"PROIZVODI_DELETE"}
          />
        </IndexTableActionCell>
      )}
    </IndexTableRow>
  );
};
export default TableRow;
