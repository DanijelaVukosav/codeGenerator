import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SystemUser } from "../../authService/types";
import "../../styles/utils.css";
import { SystemUserContext } from "../service/SystemUserContext";
import { DeleteButton, EditButton, IndexTableActionCell, IndexTableRow, TableRowContent } from "../../generalComponents";
import { SystemUserColumns } from "../types";

interface IProps {
  data: SystemUser;
  index: number;
}

const TableRow: React.FunctionComponent<IProps> = (props) => {
  const { onDeleteSystemUser, openEditUserModal } = useContext(SystemUserContext);

  return (
    <IndexTableRow>
      <TableRowContent object={props?.data} fields={SystemUserColumns} />
      <IndexTableActionCell className="flex_center">
        <EditButton onClick={() => openEditUserModal(props.data)} />
        &nbsp;
        <DeleteButton
          onClick={() => {
            props.data?.id && onDeleteSystemUser(props.data.id);
          }}
        />
      </IndexTableActionCell>
    </IndexTableRow>
  );
};
export default TableRow;
