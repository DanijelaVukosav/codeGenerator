import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import * as toastr from "toastr";
import { FilterCriteria, SortDirection } from "../../../api/generalService/types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNarudzbeService } from "./NarudzbeService";
import { Narudzbe } from "../types";
import { usePagination } from "../../../hooks/usePagination";
import { useFilterAndSort } from "../../../hooks/useFilterAndSort";
import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";


export type NarudzbeContextType = {
  isReady: boolean;
  hasError: boolean;
  isEnabledTableActions?: boolean;

  filteredObjects: Narudzbe[] | undefined;
  sortingColumns: Map<string, SortDirection>;
  changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
  clearFilters: () => void;
  predefinedFilterCriteria?: FilterCriteria;

  numberOfPages: number;
  pageSize: string;
  changePaginationPage: (page: number) => void;
  changePageSize: (newPageSize: string) => void;

  onRowSelect?: (narudzbe: Narudzbe) => void;
  selectedRowId?: string | number;
  singleObject?: Narudzbe;

  editNarudzbe?: Narudzbe | undefined;
  openEditNarudzbeModal: (narudzbe: Narudzbe) => void;

  isOpenNarudzbeModal: boolean;
  setOpenNarudzbeModal?: React.Dispatch<React.SetStateAction<boolean>>;
  closeNarudzbeModal: () => void;

  isExpandedFilterContainer: boolean;
  setExpandedFilterContainer?: React.Dispatch<React.SetStateAction<boolean>>;

  changeColumnSort: (columnName: string) => void;
  onDeleteNarudzbe: (id: number) => Promise<void> | void;
  handleSubmitNewNarudzbe: (newNarudzbe: Narudzbe) => void;
  handleEditNarudzbe: (narudzbe?: Narudzbe) => void;
};


export const NarudzbeContext = createContext<NarudzbeContextType>({
  isReady: false,
  hasError: false,
  isEnabledTableActions: true,
  filteredObjects: [],
  sortingColumns: new Map<string, SortDirection>(),
  isExpandedFilterContainer: false,
  numberOfPages: 1,
  pageSize: "20",
  isOpenNarudzbeModal: false,
  changeFilterCriteria: (_filterCriteriaArray: FilterCriteria[]) => {},
  changePaginationPage: (_page: number) => {},
  changePageSize: (_newPageSize: string) => {},
  changeColumnSort: (_columnName: string) => {},
  onDeleteNarudzbe: (_id: number) => {},
  handleSubmitNewNarudzbe: (_newNarudzbe: Narudzbe) => {},
  openEditNarudzbeModal: (_narudzbe: Narudzbe) => {},
  handleEditNarudzbe: (_narudzbe?: Narudzbe) => {},
  closeNarudzbeModal: () => {},
  clearFilters: () => {},
});

type NarudzbeProps = {
  children: React.ReactNode;
  isEnabledTableActions?: boolean;
  objectId?: string | number;
  objects?: Narudzbe[];
  onRowSelect?: (narudzbe: Narudzbe) => void;
  selectedRowId?: string | number;
  predefinedFilterCriteria?: FilterCriteria;
};


export const NarudzbeContextProvider: FC<NarudzbeProps> = ({
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
  const { getData, deleteObject, getById } = useNarudzbeService();

  const [isOpenNarudzbeModal, setOpenNarudzbeModal] = useState(false);
  const [editNarudzbe, setEditNarudzbe] = useState<Narudzbe | undefined>();

  const [isExpandedFilterContainer, setExpandedFilterContainer] = useState(false);
  const [filteredObjects, setFilteredObjects] = useState<Narudzbe[] | undefined>(objects);
  const [singleObject, setSingleObject] = useState<Narudzbe | undefined>();

  const { pageSize, setPageSize, numberOfPages, setNumberOfPages } = usePagination();
  const { filterSpecification, sortingColumns, setFilterSpecification, changeFilterCriteria, changeColumnSort, changePaginationPage, clearFilters } =
    useFilterAndSort();

  const loadNarudzbeesQueryKey: QueryKey = ["getData", filterSpecification];

  const {
    refetch,
    data: narudzbeesData,
    error,
    isFetched: isReady,
  } = useQuery({
    queryKey: loadNarudzbeesQueryKey,
    queryFn: () => getData(filterSpecification),
    enabled: isEmpty(objects) && !objectId,
  });

  useEffect(() => {
    if (!error) return;
    setFilteredObjects([]);
  }, [error]);

  useEffect(() => {
    if (!narudzbeesData) return;

    setFilteredObjects(narudzbeesData.content);
    setNumberOfPages(narudzbeesData.totalPages);
  }, [narudzbeesData]);

  const loadSingleNarudzbeQueryKey: QueryKey = ["getById", objectId];

  const { data: singleObjectData, error: singleObjectError } = useQuery({
    queryKey: loadSingleNarudzbeQueryKey,
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
        if (pathname === `${APPLICATION_ROUTES.NARUDZBE}/${id}`) {
          navigate(APPLICATION_ROUTES.NARUDZBE);
        } else {
          setSingleObject(undefined);
        }
        return;
      }
      isDeleted && setFilteredObjects((state) => state?.filter((object) => object.id !== id));
    },
    [objectId, pathname, navigate, setSingleObject, setFilteredObjects],
  );

  const deleteNarudzbe = useMutation({
    mutationFn: (id: number) => deleteObject(id),
    onSuccess: (_data, variables, _context) => onSuccessDelete(variables, true),
  });

  const onDeleteNarudzbe = useCallback(
    (id: number) => {
      confirmAlert({
        title: "Confirm to delete",
        message: `Do you want delete object - ${id}?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteNarudzbe.mutate(id),
          },
          {
            label: "No",
          },
        ],
      });
    },
    [deleteNarudzbe],
  );

  const handleSubmitNewNarudzbe = useCallback(
    (_newNarudzbe: Narudzbe) => {
      setOpenNarudzbeModal(false);
      void refetch();
    },
    [refetch],
  );

  const openEditNarudzbeModal = useCallback((narudzbe: Narudzbe) => {
    setOpenNarudzbeModal(true);
    setEditNarudzbe(narudzbe);
  }, []);

  const closeNarudzbeModal = useCallback(() => {
    setOpenNarudzbeModal(false);
    setEditNarudzbe(undefined);
  }, []);

  const handleEditNarudzbe = useCallback(
    (editedNarudzbe?: Narudzbe) => {
      if (editedNarudzbe) {
        if (singleObject) {
          setSingleObject(editedNarudzbe);
        } else {
          setFilteredObjects((state) =>
            state?.map((narudzbe) => (narudzbe.id === editedNarudzbe.id ? { ...narudzbe, ...editedNarudzbe } : narudzbe)),
          );
        }
      }
      closeNarudzbeModal();
    },
    [singleObject, setSingleObject,  setFilteredObjects, closeNarudzbeModal],
  );

  return (
    <NarudzbeContext.Provider
      value={{
        isReady,
        hasError: Boolean(error || singleObjectError),
        isEnabledTableActions,
        filteredObjects,
        sortingColumns,
        numberOfPages,
        pageSize,
        isOpenNarudzbeModal,
        editNarudzbe,
        isExpandedFilterContainer,
        setOpenNarudzbeModal,
        setExpandedFilterContainer,
        changeFilterCriteria,
        clearFilters,
        changePaginationPage,
        changePageSize,
        changeColumnSort,
        onDeleteNarudzbe,
        handleSubmitNewNarudzbe,
        openEditNarudzbeModal,
        handleEditNarudzbe,
        closeNarudzbeModal,

        onRowSelect,
        selectedRowId,
        singleObject,
        predefinedFilterCriteria,
      }}
    >
      {children}
    </NarudzbeContext.Provider>
  );
};
