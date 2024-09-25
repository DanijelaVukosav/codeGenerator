import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import * as toastr from "toastr";
import { FilterCriteria, SortDirection } from "../../../api/generalService/types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useProizvodiService } from "./ProizvodiService";
import { Proizvodi } from "../types";
import { usePagination } from "../../../hooks/usePagination";
import { useFilterAndSort } from "../../../hooks/useFilterAndSort";
import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";


export type ProizvodiContextType = {
  isReady: boolean;
  hasError: boolean;
  isEnabledTableActions?: boolean;

  filteredObjects: Proizvodi[] | undefined;
  sortingColumns: Map<string, SortDirection>;
  changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
  clearFilters: () => void;
  predefinedFilterCriteria?: FilterCriteria;

  numberOfPages: number;
  pageSize: string;
  changePaginationPage: (page: number) => void;
  changePageSize: (newPageSize: string) => void;

  onRowSelect?: (proizvodi: Proizvodi) => void;
  selectedRowId?: string | number;
  singleObject?: Proizvodi;

  editProizvodi?: Proizvodi | undefined;
  openEditProizvodiModal: (proizvodi: Proizvodi) => void;

  isOpenProizvodiModal: boolean;
  setOpenProizvodiModal?: React.Dispatch<React.SetStateAction<boolean>>;
  closeProizvodiModal: () => void;

  isExpandedFilterContainer: boolean;
  setExpandedFilterContainer?: React.Dispatch<React.SetStateAction<boolean>>;

  changeColumnSort: (columnName: string) => void;
  onDeleteProizvodi: (id: number) => Promise<void> | void;
  handleSubmitNewProizvodi: (newProizvodi: Proizvodi) => void;
  handleEditProizvodi: (proizvodi?: Proizvodi) => void;
};


export const ProizvodiContext = createContext<ProizvodiContextType>({
  isReady: false,
  hasError: false,
  isEnabledTableActions: true,
  filteredObjects: [],
  sortingColumns: new Map<string, SortDirection>(),
  isExpandedFilterContainer: false,
  numberOfPages: 1,
  pageSize: "20",
  isOpenProizvodiModal: false,
  changeFilterCriteria: (_filterCriteriaArray: FilterCriteria[]) => {},
  changePaginationPage: (_page: number) => {},
  changePageSize: (_newPageSize: string) => {},
  changeColumnSort: (_columnName: string) => {},
  onDeleteProizvodi: (_id: number) => {},
  handleSubmitNewProizvodi: (_newProizvodi: Proizvodi) => {},
  openEditProizvodiModal: (_proizvodi: Proizvodi) => {},
  handleEditProizvodi: (_proizvodi?: Proizvodi) => {},
  closeProizvodiModal: () => {},
  clearFilters: () => {},
});

type ProizvodiProps = {
  children: React.ReactNode;
  isEnabledTableActions?: boolean;
  objectId?: string | number;
  objects?: Proizvodi[];
  onRowSelect?: (proizvodi: Proizvodi) => void;
  selectedRowId?: string | number;
  predefinedFilterCriteria?: FilterCriteria;
};


export const ProizvodiContextProvider: FC<ProizvodiProps> = ({
                                                           children,
                                                           objects,
                                                           objectId,
                                                           onRowSelect,
                                                           selectedRowId,
                                                           isEnabledTableActions = true,
                                                           predefinedFilterCriteria,
                                                         }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getData, deleteObject, getById } = useProizvodiService();

  const [isOpenProizvodiModal, setOpenProizvodiModal] = useState(false);
  const [editProizvodi, setEditProizvodi] = useState<Proizvodi | undefined>();

  const [isExpandedFilterContainer, setExpandedFilterContainer] = useState(false);
  const [filteredObjects, setFilteredObjects] = useState<Proizvodi[] | undefined>(objects);
  const [singleObject, setSingleObject] = useState<Proizvodi | undefined>();

  const { pageSize, setPageSize, numberOfPages, setNumberOfPages } = usePagination();
  const { filterSpecification, sortingColumns, setFilterSpecification, changeFilterCriteria, changeColumnSort, changePaginationPage, clearFilters } =
    useFilterAndSort();

  const loadProizvodiesQueryKey: QueryKey = ["getData", filterSpecification];

  const {
    refetch,
    data: proizvodiesData,
    error,
    isFetched: isReady,
  } = useQuery({
    queryKey: loadProizvodiesQueryKey,
    queryFn: () => getData(filterSpecification),
    enabled: isEmpty(objects) && !objectId,
  });

  useEffect(() => {
    if (!error) return;
    setFilteredObjects([]);
  }, [error]);

  useEffect(() => {
    if (!proizvodiesData) return;

    setFilteredObjects(proizvodiesData.content);
    setNumberOfPages(proizvodiesData.totalPages);
  }, [proizvodiesData]);

  const loadSingleProizvodiQueryKey: QueryKey = ["getById", objectId];

  const { data: singleObjectData, error: singleObjectError } = useQuery({
    queryKey: loadSingleProizvodiQueryKey,
    queryFn: () => getById(objectId),
    enabled: !!objectId,
  });

  useEffect(() => {
    if (!singleObjectData) return;

    setSingleObject(singleObjectData);
  }, [singleObjectData]);

  useEffect(() => {
    if (!isEmpty(objects) || objectId) return;
    void refetch();
  }, [filterSpecification, refetch, objects, objectId]);

  const changePageSize = useCallback(
    (newPageSize: string) => {
      if (+newPageSize && pageSize !== newPageSize) {
        setPageSize(newPageSize);
        setFilterSpecification((state) => ({ ...state, size: +newPageSize }));
        changePaginationPage(0);
      }
    },
    [pageSize, setPageSize, setFilterSpecification, changePaginationPage],
  );

  const onSuccessDelete = useCallback(
    (id: number, isDeleted: boolean) => {
      if (isDeleted && objectId) {
        toastr.success("Successfully deleted.");
        if (pathname === `${APPLICATION_ROUTES.PROIZVODI}/${id}`) {
          navigate(APPLICATION_ROUTES.PROIZVODI);
        } else {
          setSingleObject(undefined);
        }
        return;
      }
      isDeleted && setFilteredObjects((state) => state?.filter((object) => object.id !== id));
    },
    [objectId, pathname, navigate, setSingleObject, setFilteredObjects],
  );

  const deleteProizvodi = useMutation({
    mutationFn: (id: number) => deleteObject(id),
    onSuccess: (_data, variables, _context) => onSuccessDelete(variables, true),
  });

  const onDeleteProizvodi = useCallback(
    (id: number) => {
      confirmAlert({
        title: "Confirm to delete",
        message: `Do you want delete object - ${id}?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteProizvodi.mutate(id),
          },
          {
            label: "No",
          },
        ],
      });
    },
    [deleteProizvodi],
  );

  const handleSubmitNewProizvodi = useCallback(
    (_newProizvodi: Proizvodi) => {
      setOpenProizvodiModal(false);
      void refetch();
    },
    [refetch],
  );

  const openEditProizvodiModal = useCallback((proizvodi: Proizvodi) => {
    setOpenProizvodiModal(true);
    setEditProizvodi(proizvodi);
  }, []);

  const closeProizvodiModal = useCallback(() => {
    setOpenProizvodiModal(false);
    setEditProizvodi(undefined);
  }, []);

  const handleEditProizvodi = useCallback(
    (editedProizvodi?: Proizvodi) => {
      if (editedProizvodi) {
        if (singleObject) {
          setSingleObject(editedProizvodi);
        } else {
          setFilteredObjects((state) =>
            state?.map((proizvodi) => (proizvodi.id === editedProizvodi.id ? { ...proizvodi, ...editedProizvodi } : proizvodi)),
          );
        }
      }
      closeProizvodiModal();
    },
    [singleObject, setSingleObject,  setFilteredObjects, closeProizvodiModal],
  );

  return (
    <ProizvodiContext.Provider
      value={{
        isReady,
        hasError: Boolean(error || singleObjectError),
        isEnabledTableActions,
        filteredObjects,
        sortingColumns,
        numberOfPages,
        pageSize,
        isOpenProizvodiModal,
        editProizvodi,
        isExpandedFilterContainer,
        setOpenProizvodiModal,
        setExpandedFilterContainer,
        changeFilterCriteria,
        clearFilters,
        changePaginationPage,
        changePageSize,
        changeColumnSort,
        onDeleteProizvodi,
        handleSubmitNewProizvodi,
        openEditProizvodiModal,
        handleEditProizvodi,
        closeProizvodiModal,

        onRowSelect,
        selectedRowId,
        singleObject,
        predefinedFilterCriteria,
      }}
    >
      {children}
    </ProizvodiContext.Provider>
  );
};
