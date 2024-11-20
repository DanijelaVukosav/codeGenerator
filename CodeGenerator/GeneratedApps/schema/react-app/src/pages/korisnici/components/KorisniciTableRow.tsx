import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { KorisniciColumns } from "../types";
import "../../../styles/utils.css";
import { KorisniciContext } from "../service/KorisniciContext";
import { DeleteButton, EditButton, IndexTableActionCell, IndexTableRow } from "../../../generalComponents";
import { PATH_SEPARATOR } from "../../../api/generalService/types";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { TableRowContent } from "../../../generalComponents";

interface IProps {
  data: any;
  index: number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  const { onDeleteKorisnici, openEditKorisniciModal, onRowSelect, selectedRowId, isEnabledTableActions } = useContext(KorisniciContext);
  let navigate = useNavigate();

  const onRowClick = () => {
    if (onRowSelect) {
      onRowSelect?.(props.data);
      return;
    }
    navigate(APPLICATION_ROUTES.KORISNICI + PATH_SEPARATOR + props.data.id);
  };
  const isSelectedRow = selectedRowId && props.data.id.toString() === selectedRowId?.toString();

  return (
    <IndexTableRow onClick={onRowClick} className={isSelectedRow ? "selected_row" : ""}>
      <TableRowContent object={props?.data} fields={KorisniciColumns} />
      {isEnabledTableActions && (
        <IndexTableActionCell className="flex_center">
          <EditButton onClick={() => openEditKorisniciModal(props.data)} abilitySubject={"KORISNICI_UPDATE"} />
          &nbsp;
          <DeleteButton
            onClick={() => {
              props.data?.id && onDeleteKorisnici(props.data.id);
            }}
            abilitySubject={"KORISNICI_DELETE"}
          />
        </IndexTableActionCell>
      )}
    </IndexTableRow>
  );
};
export default TableRow;
