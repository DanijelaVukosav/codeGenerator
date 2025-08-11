import * as React from 'react';
import { createContext, FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { SystemUser, SystemUserPermission } from '../../authService/types';
import { FilterCriteria, SortDirection } from '../../api/generalService/types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSystemUsersService } from './SystemUserService';
import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { usePagination } from '../../hooks/usePagination';
import { useFilterAndSort } from '../../hooks/useFilterAndSort';

export interface SystemUsersContextType {
    isReady: boolean;
    hasError: boolean;
    filteredObjects: SystemUser[] | undefined;
    sortingColumns: Map<string, SortDirection>;
    isExpandedFilterContainer: boolean;
    numberOfPages: number;
    pageSize: string;
    isOpenUserModal: boolean;
    editUser?: SystemUser | undefined;
    setOpenUserModal?: (state: boolean) => void;
    setExpandedFilterContainer?: React.Dispatch<React.SetStateAction<boolean>>;
    changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
    clearFilters: () => void;
    changePaginationPage: (page: number) => void;
    changePageSize: (newPageSize: string) => void;
    changeColumnSort: (columnName: string) => void;
    onDeleteSystemUser: (id: number) => Promise<void> | void;
    handleSubmitNewAccount: (newUser: SystemUser) => void;
    openEditUserModal: (user: SystemUser) => void;
    handleEditSystemUser: (user?: SystemUser) => void;
    closeUserModal: () => void;
}

export const SystemUserContext = createContext<SystemUsersContextType>({
    isReady: false,
    hasError: false,
    filteredObjects: [],
    sortingColumns: new Map<string, SortDirection>(),
    isExpandedFilterContainer: false,
    numberOfPages: 1,
    pageSize: '20',
    isOpenUserModal: false,
    changeFilterCriteria: (_filterCriteriaArray: FilterCriteria[]) => {},
    clearFilters: () => {},
    changePaginationPage: (_page: number) => {},
    changePageSize: (_newPageSize: string) => {},
    changeColumnSort: (_columnName: string) => {},
    onDeleteSystemUser: (_id: number) => {},
    handleSubmitNewAccount: (_newUser: SystemUser) => {},
    openEditUserModal: (_user: SystemUser) => {},
    handleEditSystemUser: (_user?: SystemUser) => {},
    closeUserModal: () => {}
});

interface SystemUserProps {
    children: string | ReactElement;
}

export const SystemUsersContextProvider: FC<SystemUserProps> = ({ children }) => {
    const { getData, deleteObject } = useSystemUsersService();

    const [isOpenUserModal, setOpenUserModal] = useState(false);
    const [editUser, setEditUser] = useState<SystemUser | undefined>();

    const [isExpandedFilterContainer, setExpandedFilterContainer] = useState(false);
    const [filteredObjects, setFilteredObjects] = React.useState<SystemUser[] | undefined>([]);

    const { pageSize, setPageSize, numberOfPages, setNumberOfPages } = usePagination();
    const {
        filterSpecification,
        sortingColumns,
        setFilterSpecification,
        changeFilterCriteria,
        changeColumnSort,
        changePaginationPage,
        clearFilters
    } = useFilterAndSort();
    const loadSystemUsersQueryKey: QueryKey = ['getData', filterSpecification];

    const {
        refetch,
        data: systemUsersData,
        error,
        isFetched: isReady
    } = useQuery({
        queryKey: loadSystemUsersQueryKey,
        queryFn: () => getData(filterSpecification),
        enabled: true
    });

    useEffect(() => {
        if (!error) return;
        setFilteredObjects([]);
    }, [error]);

    useEffect(() => {
        if (!systemUsersData) return;

        const mappedObjects = systemUsersData.content.map((userData) => ({
            ...userData,
            permissions: userData.permissions?.map((permission) => permission?.name)
        }));

        setFilteredObjects(mappedObjects);
        setNumberOfPages(systemUsersData.totalPages);
    }, [systemUsersData]);

    useEffect(() => {
        void refetch();
    }, [filterSpecification, refetch]);

    const changePageSize = useCallback(
        (newPageSize: string) => {
            if (+newPageSize && pageSize !== newPageSize) {
                setPageSize(newPageSize);
                setFilterSpecification((state) => {
                    return { ...state, size: +newPageSize };
                });
            }
        },
        [pageSize, setPageSize, setFilterSpecification]
    );
    const onSuccessDelete = useCallback(
        (id: number, isDeleted: boolean) => {
            if (isDeleted) {
                setFilteredObjects((state) => state?.filter((object) => object.id !== id));
            }
        },
        [setFilteredObjects]
    );

    const deleteSystemUser = useMutation({
        mutationFn: (id: number) => deleteObject(id),
        onSuccess: (_data, variables, _context) => onSuccessDelete(variables, true)
    });

    const onDeleteSystemUser = useCallback(
        async (id: number) => {
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Do you want delete user ' + id + '?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteSystemUser.mutate(id)
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        },
        [deleteSystemUser]
    );

    const handleSubmitNewAccount = useCallback(
        (_newUser: SystemUser) => {
            setOpenUserModal(false);
            void refetch();
        },
        [refetch]
    );

    const openEditUserModal = useCallback((user: SystemUser) => {
        setOpenUserModal(true);
        setEditUser(user);
    }, []);

    const closeUserModal = useCallback(() => {
        setOpenUserModal(false);
        setEditUser(undefined);
    }, []);

    const handleEditSystemUser = useCallback(
        (user?: SystemUser) => {
            if (user) {
                setFilteredObjects((state) => {
                    return state?.map((systemUser: SystemUser) => {
                        if (systemUser.id === user.id) {
                            return {
                                ...user,
                                permissions: (
                                    (user.permissions as SystemUserPermission[]) ?? []
                                ).map((permission: SystemUserPermission) => permission.name)
                            };
                        } else return systemUser;
                    });
                });
            }
            closeUserModal();
        },
        [setFilteredObjects, closeUserModal]
    );

    return (
        <SystemUserContext.Provider
            value={{
                isReady,
                hasError: Boolean(error),
                filteredObjects,
                sortingColumns,
                numberOfPages,
                pageSize,
                isOpenUserModal,
                editUser,
                isExpandedFilterContainer,
                setOpenUserModal,
                setExpandedFilterContainer,
                changeFilterCriteria,
                clearFilters,
                changePaginationPage,
                changePageSize,
                changeColumnSort,
                onDeleteSystemUser,
                handleSubmitNewAccount,
                openEditUserModal,
                handleEditSystemUser,
                closeUserModal
            }}>
            {children}
        </SystemUserContext.Provider>
    );
};
