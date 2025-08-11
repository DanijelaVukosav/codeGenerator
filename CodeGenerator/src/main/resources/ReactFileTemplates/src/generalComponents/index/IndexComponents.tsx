import * as React from 'react';
import '../../styles/index.css';
import '../../styles/utils.css';
import { FC, ReactNode } from 'react';
import { Button } from '../common/Button';

export const IndexTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <React.Fragment>
            <h4 className="text-center">{title}</h4>
            <br />
        </React.Fragment>
    );
};
export const IndexPageHeader: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="header_wrapper">{children}</div>;
};
export const IndexAddButton: FC<{ isVisible: boolean; openModal: (visible: boolean) => void }> = ({
    isVisible,
    openModal
}) => {
    return isVisible ? (
        <Button className={'add_button'} label={'NEW'} onClick={() => openModal(true)}>
            <img src={'/svg/add.svg'} style={{ height: '24px', width: '24px' }} alt={'Add'} />
        </Button>
    ) : (
        <React.Fragment />
    );
};

export const IndexTableWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <table className="table table-striped" style={{ marginTop: 20 }}>
            {children}
        </table>
    );
};

export const IndexTableHeader: FC<{ children: ReactNode }> = ({ children }) => {
    return <thead className="thead-dark">{children}</thead>;
};

export const IndexTableRow: FC<{ children: ReactNode } & React.ComponentProps<'tr'>> = ({
    children,
    ...props
}) => {
    return <tr {...props}>{children}</tr>;
};

export const IndexTableActionCell: FC<{ children: ReactNode } & React.ComponentProps<'td'>> = ({
    children,
    ...props
}) => {
    return (
        <td className={'middle_vertical_align'}>
            <div {...props}>{children}</div>
        </td>
    );
};
export const IndexTableBody: FC<{ children: ReactNode }> = ({ children }) => {
    return <tbody>{children}</tbody>;
};
