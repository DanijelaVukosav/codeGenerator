import React, { createContext, FC, useCallback, useEffect, useState } from "react";
import * as toastr from "toastr";
import { FilterCriteria, SortDirection } from "../../../api/generalService/types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { use#{FUL_TABLE_NAME}#Service } from "./#{FUL_TABLE_NAME}#Service";
import { #{FUL_TABLE_NAME}# } from "../types";
import { usePagination } from "../../../hooks/usePagination";
import { useFilterAndSort } from "../../../hooks/useFilterAndSort";
import { isEmpty } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { APPLICATION_ROUTES } from "../../../router/routes";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";


export interface #{FUL_TABLE_NAME}#ContextType {
  isReady: boolean;
  hasError: boolean;
  isEnabledTableActions?: boolean;

  filteredObjects: #{FUL_TABLE_NAME}#[] | undefined;
  sortingColumns: Map<string, SortDirection>;
  changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
  clearFilters: () => void;
  predefinedFilterCriteria?: FilterCriteria;

  numberOfPages: number;
  pageSize: string;
  changePaginationPage: (page: number) => void;
  changePageSize: (newPageSize: string) => void;

  onRowSelect?: (#{FLL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => void;
  selectedRowId?: string | number;
  singleObject?: #{FUL_TABLE_NAME}#;

  edit#{FUL_TABLE_NAME}#?: #{FUL_TABLE_NAME}# | undefined;
  openEdit#{FUL_TABLE_NAME}#Modal: (#{FLL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => void;

  isOpen#{FUL_TABLE_NAME}#Modal: boolean;
  setOpen#{FUL_TABLE_NAME}#Modal?: React.Dispatch<React.SetStateAction<boolean>>;
  close#{FUL_TABLE_NAME}#Modal: () => void;

  isExpandedFilterContainer: boolean;
  setExpandedFilterContainer?: React.Dispatch<React.SetStateAction<boolean>>;

  changeColumnSort: (columnName: string) => void;
  onDelete#{FUL_TABLE_NAME}#: (id: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}#) => Promise<void> | void;
  handleSubmitNew#{FUL_TABLE_NAME}#: (new#{FUL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => void;
  handleEdit#{FUL_TABLE_NAME}#: (#{FLL_TABLE_NAME}#?: #{FUL_TABLE_NAME}#) => void;
};


export const #{FUL_TABLE_NAME}#Context = createContext<#{FUL_TABLE_NAME}#ContextType>({
  isReady: false,
  hasError: false,
  isEnabledTableActions: true,
  filteredObjects: [],
  sortingColumns: new Map<string, SortDirection>(),
  isExpandedFilterContainer: false,
  numberOfPages: 1,
  pageSize: "20",
  isOpen#{FUL_TABLE_NAME}#Modal: false,
  changeFilterCriteria: (_filterCriteriaArray: FilterCriteria[]) => {},
  changePaginationPage: (_page: number) => {},
  changePageSize: (_newPageSize: string) => {},
  changeColumnSort: (_columnName: string) => {},
  onDelete#{FUL_TABLE_NAME}#: (_id: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}#) => {},
  handleSubmitNew#{FUL_TABLE_NAME}#: (_new#{FUL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => {},
  openEdit#{FUL_TABLE_NAME}#Modal: (_#{FLL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => {},
  handleEdit#{FUL_TABLE_NAME}#: (_#{FLL_TABLE_NAME}#?: #{FUL_TABLE_NAME}#) => {},
  close#{FUL_TABLE_NAME}#Modal: () => {},
  clearFilters: () => {},
});

interface #{FUL_TABLE_NAME}#Props {
  children: React.ReactNode;
  isEnabledTableActions?: boolean;
  objectId?: string | number;
  objects?: #{FUL_TABLE_NAME}#[];
  onRowSelect?: (#{FLL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => void;
  selectedRowId?: string | number;
  predefinedFilterCriteria?: FilterCriteria;
};


export const #{FUL_TABLE_NAME}#ContextProvider: FC<#{FUL_TABLE_NAME}#Props> = ({
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
  const { getData, deleteObject, getById } = use#{FUL_TABLE_NAME}#Service();

  const [isOpen#{FUL_TABLE_NAME}#Modal, setOpen#{FUL_TABLE_NAME}#Modal] = useState(false);
  const [edit#{FUL_TABLE_NAME}#, setEdit#{FUL_TABLE_NAME}#] = useState<#{FUL_TABLE_NAME}# | undefined>();

  const [isExpandedFilterContainer, setExpandedFilterContainer] = useState(false);
  const [filteredObjects, setFilteredObjects] = useState<#{FUL_TABLE_NAME}#[] | undefined>(objects);
  const [singleObject, setSingleObject] = useState<#{FUL_TABLE_NAME}# | undefined>();

  const { pageSize, setPageSize, numberOfPages, setNumberOfPages } = usePagination();
  const { filterSpecification, sortingColumns, setFilterSpecification, changeFilterCriteria, changeColumnSort, changePaginationPage, clearFilters } =
    useFilterAndSort();

  const load#{FUL_TABLE_NAME}#esQueryKey: QueryKey = ["getData#{FUL_TABLE_NAME}#", filterSpecification];

  const {
    refetch,
    data: #{FLL_TABLE_NAME}#esData,
    error,
    isFetched: isReady,
  } = useQuery({
    queryKey: load#{FUL_TABLE_NAME}#esQueryKey,
    queryFn: () => getData(filterSpecification),
    enabled: isEmpty(objects) && !objectId,
  });

  useEffect(() => {
    if (!error) return;
    setFilteredObjects([]);
  }, [error]);

  useEffect(() => {
    if (!#{FLL_TABLE_NAME}#esData) return;

    setFilteredObjects(#{FLL_TABLE_NAME}#esData.content);
    setNumberOfPages(#{FLL_TABLE_NAME}#esData.totalPages);
  }, [#{FLL_TABLE_NAME}#esData]);

  const loadSingle#{FUL_TABLE_NAME}#QueryKey: QueryKey = ["get#{FUL_TABLE_NAME}#ById", objectId];

  const { data: singleObjectData, error: singleObjectError } = useQuery({
    queryKey: loadSingle#{FUL_TABLE_NAME}#QueryKey,
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
    (id: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}#, isDeleted: boolean) => {
      if (isDeleted && objectId) {
        toastr.success("Successfully deleted.");
        if (pathname === `${APPLICATION_ROUTES.#{AUL_TABLE_NAME}#}/${id}`) {
          navigate(APPLICATION_ROUTES.#{AUL_TABLE_NAME}#);
        } else {
          setSingleObject(undefined);
        }
        return;
      }
      if(isDeleted) { setFilteredObjects((state) => state?.filter((object) => object.#{TABLE_PRIMARY_KEY_COLUMN}# !== id));}
    },
    [objectId, pathname, navigate, setSingleObject, setFilteredObjects],
  );

  const delete#{FUL_TABLE_NAME}# = useMutation({
    mutationFn: (id: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}#) => deleteObject(id),
    onSuccess: (_data, variables, _context) => onSuccessDelete(variables, true),
  });

  const onDelete#{FUL_TABLE_NAME}# = useCallback(
    (id: #{TABLE_PRIMARY_KEY_COLUMN_TYPE}#) => {
      confirmAlert({
        title: "Confirm to delete",
        message: `Do you want delete object - ${id}?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => delete#{FUL_TABLE_NAME}#.mutate(id),
          },
          {
            label: "No",
          },
        ],
      });
    },
    [delete#{FUL_TABLE_NAME}#],
  );

  const handleSubmitNew#{FUL_TABLE_NAME}# = useCallback(
    (_new#{FUL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => {
      setOpen#{FUL_TABLE_NAME}#Modal(false);
      void refetch();
    },
    [refetch],
  );

  const openEdit#{FUL_TABLE_NAME}#Modal = useCallback((#{FLL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => {
    setOpen#{FUL_TABLE_NAME}#Modal(true);
    setEdit#{FUL_TABLE_NAME}#(#{FLL_TABLE_NAME}#);
  }, []);

  const close#{FUL_TABLE_NAME}#Modal = useCallback(() => {
    setOpen#{FUL_TABLE_NAME}#Modal(false);
    setEdit#{FUL_TABLE_NAME}#(undefined);
  }, []);

  const handleEdit#{FUL_TABLE_NAME}# = useCallback(
    (edited#{FUL_TABLE_NAME}#?: #{FUL_TABLE_NAME}#) => {
      if (edited#{FUL_TABLE_NAME}#) {
        if (singleObject) {
          setSingleObject(edited#{FUL_TABLE_NAME}#);
        } else {
          setFilteredObjects((state) =>
            state?.map((#{FLL_TABLE_NAME}#) => (#{FLL_TABLE_NAME}#.#{TABLE_PRIMARY_KEY_COLUMN}# === edited#{FUL_TABLE_NAME}#.#{TABLE_PRIMARY_KEY_COLUMN}# ? { ...#{FLL_TABLE_NAME}#, ...edited#{FUL_TABLE_NAME}# } : #{FLL_TABLE_NAME}#)),
          );
        }
      }
      close#{FUL_TABLE_NAME}#Modal();
    },
    [singleObject, setSingleObject,  setFilteredObjects, close#{FUL_TABLE_NAME}#Modal],
  );

  return (
    <#{FUL_TABLE_NAME}#Context.Provider
      value={{
        isReady,
        hasError: Boolean(error || singleObjectError),
        isEnabledTableActions,
        filteredObjects,
        sortingColumns,
        numberOfPages,
        pageSize,
        isOpen#{FUL_TABLE_NAME}#Modal,
        edit#{FUL_TABLE_NAME}#,
        isExpandedFilterContainer,
        setOpen#{FUL_TABLE_NAME}#Modal,
        setExpandedFilterContainer,
        changeFilterCriteria,
        clearFilters,
        changePaginationPage,
        changePageSize,
        changeColumnSort,
        onDelete#{FUL_TABLE_NAME}#,
        handleSubmitNew#{FUL_TABLE_NAME}#,
        openEdit#{FUL_TABLE_NAME}#Modal,
        handleEdit#{FUL_TABLE_NAME}#,
        close#{FUL_TABLE_NAME}#Modal,

        onRowSelect,
        selectedRowId,
        singleObject,
        predefinedFilterCriteria,
      }}
    >
      {children}
    </#{FUL_TABLE_NAME}#Context.Provider>
  );
};
