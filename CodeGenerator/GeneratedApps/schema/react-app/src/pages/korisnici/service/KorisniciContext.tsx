import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import * as toastr from "toastr";
import { FilterCriteria, SortDirection } from "../../../api/generalService/types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useKorisniciService } from "./KorisniciService";
import { Korisnici } from "../types";
import { usePagination } from "../../../hooks/usePagination";
import { useFilterAndSort } from "../../../hooks/useFilterAndSort";
import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";


export type KorisniciContextType = {
  isReady: boolean;
  hasError: boolean;
  isEnabledTableActions?: boolean;

  filteredObjects: Korisnici[] | undefined;
  sortingColumns: Map<string, SortDirection>;
  changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
  clearFilters: () => void;
  predefinedFilterCriteria?: FilterCriteria;

  numberOfPages: number;
  pageSize: string;
  changePaginationPage: (page: number) => void;
  changePageSize: (newPageSize: string) => void;

  onRowSelect?: (korisnici: Korisnici) => void;
  selectedRowId?: string | number;
  singleObject?: Korisnici;

  editKorisnici?: Korisnici | undefined;
  openEditKorisniciModal: (korisnici: Korisnici) => void;

  isOpenKorisniciModal: boolean;
  setOpenKorisniciModal?: React.Dispatch<React.SetStateAction<boolean>>;
  closeKorisniciModal: () => void;

  isExpandedFilterContainer: boolean;
  setExpandedFilterContainer?: React.Dispatch<React.SetStateAction<boolean>>;

  changeColumnSort: (columnName: string) => void;
  onDeleteKorisnici: (id: number) => Promise<void> | void;
  handleSubmitNewKorisnici: (newKorisnici: Korisnici) => void;
  handleEditKorisnici: (korisnici?: Korisnici) => void;
};


export const KorisniciContext = createContext<KorisniciContextType>({
  isReady: false,
  hasError: false,
  isEnabledTableActions: true,
  filteredObjects: [],
  sortingColumns: new Map<string, SortDirection>(),
  isExpandedFilterContainer: false,
  numberOfPages: 1,
  pageSize: "20",
  isOpenKorisniciModal: false,
  changeFilterCriteria: (_filterCriteriaArray: FilterCriteria[]) => {},
  changePaginationPage: (_page: number) => {},
  changePageSize: (_newPageSize: string) => {},
  changeColumnSort: (_columnName: string) => {},
  onDeleteKorisnici: (_id: number) => {},
  handleSubmitNewKorisnici: (_newKorisnici: Korisnici) => {},
  openEditKorisniciModal: (_korisnici: Korisnici) => {},
  handleEditKorisnici: (_korisnici?: Korisnici) => {},
  closeKorisniciModal: () => {},
  clearFilters: () => {},
});

type KorisniciProps = {
  children: React.ReactNode;
  isEnabledTableActions?: boolean;
  objectId?: string | number;
  objects?: Korisnici[];
  onRowSelect?: (korisnici: Korisnici) => void;
  selectedRowId?: string | number;
  predefinedFilterCriteria?: FilterCriteria;
};


export const KorisniciContextProvider: FC<KorisniciProps> = ({
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
  const { getData, deleteObject, getById } = useKorisniciService();

  const [isOpenKorisniciModal, setOpenKorisniciModal] = useState(false);
  const [editKorisnici, setEditKorisnici] = useState<Korisnici | undefined>();

  const [isExpandedFilterContainer, setExpandedFilterContainer] = useState(false);
  const [filteredObjects, setFilteredObjects] = useState<Korisnici[] | undefined>(objects);
  const [singleObject, setSingleObject] = useState<Korisnici | undefined>();

  const { pageSize, setPageSize, numberOfPages, setNumberOfPages } = usePagination();
  const { filterSpecification, sortingColumns, setFilterSpecification, changeFilterCriteria, changeColumnSort, changePaginationPage, clearFilters } =
    useFilterAndSort();

  const loadKorisniciesQueryKey: QueryKey = ["getData", filterSpecification];

  const {
    refetch,
    data: korisniciesData,
    error,
    isFetched: isReady,
  } = useQuery({
    queryKey: loadKorisniciesQueryKey,
    queryFn: () => getData(filterSpecification),
    enabled: isEmpty(objects) && !objectId,
  });

  useEffect(() => {
    if (!error) return;
    setFilteredObjects([]);
  }, [error]);

  useEffect(() => {
    if (!korisniciesData) return;

    setFilteredObjects(korisniciesData.content);
    setNumberOfPages(korisniciesData.totalPages);
  }, [korisniciesData]);

  const loadSingleKorisniciQueryKey: QueryKey = ["getById", objectId];

  const { data: singleObjectData, error: singleObjectError } = useQuery({
    queryKey: loadSingleKorisniciQueryKey,
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
        if (pathname === `${APPLICATION_ROUTES.KORISNICI}/${id}`) {
          navigate(APPLICATION_ROUTES.KORISNICI);
        } else {
          setSingleObject(undefined);
        }
        return;
      }
      isDeleted && setFilteredObjects((state) => state?.filter((object) => object.id !== id));
    },
    [objectId, pathname, navigate, setSingleObject, setFilteredObjects],
  );

  const deleteKorisnici = useMutation({
    mutationFn: (id: number) => deleteObject(id),
    onSuccess: (_data, variables, _context) => onSuccessDelete(variables, true),
  });

  const onDeleteKorisnici = useCallback(
    (id: number) => {
      confirmAlert({
        title: "Confirm to delete",
        message: `Do you want delete object - ${id}?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => deleteKorisnici.mutate(id),
          },
          {
            label: "No",
          },
        ],
      });
    },
    [deleteKorisnici],
  );

  const handleSubmitNewKorisnici = useCallback(
    (_newKorisnici: Korisnici) => {
      setOpenKorisniciModal(false);
      void refetch();
    },
    [refetch],
  );

  const openEditKorisniciModal = useCallback((korisnici: Korisnici) => {
    setOpenKorisniciModal(true);
    setEditKorisnici(korisnici);
  }, []);

  const closeKorisniciModal = useCallback(() => {
    setOpenKorisniciModal(false);
    setEditKorisnici(undefined);
  }, []);

  const handleEditKorisnici = useCallback(
    (editedKorisnici?: Korisnici) => {
      if (editedKorisnici) {
        if (singleObject) {
          setSingleObject(editedKorisnici);
        } else {
          setFilteredObjects((state) =>
            state?.map((korisnici) => (korisnici.id === editedKorisnici.id ? { ...korisnici, ...editedKorisnici } : korisnici)),
          );
        }
      }
      closeKorisniciModal();
    },
    [singleObject, setSingleObject,  setFilteredObjects, closeKorisniciModal],
  );

  return (
    <KorisniciContext.Provider
      value={{
        isReady,
        hasError: Boolean(error || singleObjectError),
        isEnabledTableActions,
        filteredObjects,
        sortingColumns,
        numberOfPages,
        pageSize,
        isOpenKorisniciModal,
        editKorisnici,
        isExpandedFilterContainer,
        setOpenKorisniciModal,
        setExpandedFilterContainer,
        changeFilterCriteria,
        clearFilters,
        changePaginationPage,
        changePageSize,
        changeColumnSort,
        onDeleteKorisnici,
        handleSubmitNewKorisnici,
        openEditKorisniciModal,
        handleEditKorisnici,
        closeKorisniciModal,

        onRowSelect,
        selectedRowId,
        singleObject,
        predefinedFilterCriteria,
      }}
    >
      {children}
    </KorisniciContext.Provider>
  );
};
