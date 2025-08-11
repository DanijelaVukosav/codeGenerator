import React, { useCallback, useContext } from 'react';
import { SystemUser } from '../../authService/types';
import '../../styles/utils.css';
import { SystemUserContext } from '../service/SystemUserContext';
import {
    DeleteButton,
    EditButton,
    IndexTableActionCell,
    IndexTableRow,
    TableRowContent
} from '../../generalComponents';
import { SystemUserColumns } from '../types';

interface TableRowProps {
    data: SystemUser;
    index: number;
}

const TableRow: React.FunctionComponent<TableRowProps> = (props: TableRowProps) => {
    const { onDeleteSystemUser, openEditUserModal } = useContext(SystemUserContext);

    const deleteAction = useCallback(() => {
        if (props.data?.id) {
            onDeleteSystemUser(props.data.id);
        }
    }, [onDeleteSystemUser, props.data?.id]);

    return (
        <IndexTableRow>
            <TableRowContent object={props?.data} fields={SystemUserColumns} />
            <IndexTableActionCell className="flex_center">
                <EditButton onClick={() => openEditUserModal(props.data)} />
                &nbsp;
                <DeleteButton onClick={deleteAction} />
            </IndexTableActionCell>
        </IndexTableRow>
    );
};
export default TableRow;
