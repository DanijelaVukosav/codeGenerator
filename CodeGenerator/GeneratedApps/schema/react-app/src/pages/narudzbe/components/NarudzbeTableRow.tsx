import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NarudzbeColumns } from "../types";
import "../../../styles/utils.css";
import { NarudzbeContext } from "../service/NarudzbeContext";
import { DeleteButton, EditButton, IndexTableActionCell, IndexTableRow } from "../../../generalComponents";
import { PATH_SEPARATOR } from "../../../api/generalService/types";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { TableRowContent } from "../../../generalComponents";

interface IProps {
  data: any;
  index: number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  const { onDeleteNarudzbe, openEditNarudzbeModal, onRowSelect, selectedRowId, isEnabledTableActions } = useContext(NarudzbeContext);
  let navigate = useNavigate();

  const onRowDoubleClick = () => {
    if (onRowSelect) {
      onRowSelect?.(props.data);
      return;
    }
    navigate(APPLICATION_ROUTES.NARUDZBE + PATH_SEPARATOR + props.data.id);
  };
  const isSelectedRow = selectedRowId && props.data.id.toString() === selectedRowId?.toString();

  return (
    <IndexTableRow onDoubleClick={onRowDoubleClick} className={isSelectedRow ? "selected_row" : ""}>
      <TableRowContent object={props?.data} fields={NarudzbeColumns} />
      {isEnabledTableActions && (
        <IndexTableActionCell className="flex_center">
          <EditButton onClick={() => openEditNarudzbeModal(props.data)} abilitySubject={"NARUDZBE_UPDATE"} />
          &nbsp;
          <DeleteButton
            onClick={() => {
              props.data?.id && onDeleteNarudzbe(props.data.id);
            }}
            abilitySubject={"NARUDZBE_DELETE"}
          />
        </IndexTableActionCell>
      )}
    </IndexTableRow>
  );
};
export default TableRow;
