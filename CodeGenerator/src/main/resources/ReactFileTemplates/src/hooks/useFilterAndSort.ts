import React, { useCallback, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../generalComponents";
import { FilterCriteria, FilterData, SORT_TUPLE_SEPARATOR, SortDirection } from "../api/generalService/types";

interface FilterAndSortData {
  sortingColumns: Map<string, SortDirection>;
  setSortingColumns: React.Dispatch<React.SetStateAction<Map<string, SortDirection>>>;
  filterSpecification: FilterData;
  setFilterSpecification: React.Dispatch<React.SetStateAction<FilterData>>;
  clearFilters: () => void;
  changeFilterCriteria: (filterCriteriaArray: FilterCriteria[]) => void;
  changePaginationPage: (page: number) => void;
  changeColumnSort: (columnName: string) => void;
}

export const useFilterAndSort: (predefinedFilterCriteria?: FilterCriteria) => FilterAndSortData = (predefinedFilterCriteria) => {
  const [sortingColumns, setSortingColumns] = useState<Map<string, SortDirection>>(new Map<string, SortDirection>());

  const [filterSpecification, setFilterSpecification] = useState<FilterData>({
    filter: predefinedFilterCriteria ? [predefinedFilterCriteria] : [],
    page: 0,
    size: DEFAULT_PAGE_SIZE,
    sort: [],
  });

  const changeFilterCriteria = useCallback(
    (filterCriteriaArray: FilterCriteria[]) => {
      const newFilterCriteria = predefinedFilterCriteria ? [...filterCriteriaArray, predefinedFilterCriteria] : filterCriteriaArray;
      setFilterSpecification((state) => {
        return { ...state, filter: newFilterCriteria };
      });
    },
    [setFilterSpecification, predefinedFilterCriteria],
  );

  const changePaginationPage = useCallback(
    (page: number) => {
      if (page < 1) {
        setFilterSpecification((state) => {
          return { ...state, page: 0 };
        });
        return;
      }
      if (page - 1 !== filterSpecification.page)
        setFilterSpecification((state) => {
          return { ...state, page: page - 1 };
        });
    },
    [setFilterSpecification, filterSpecification.page],
  );

  const changeColumnSort = useCallback(
    (columnName: string) => {
      const sortDirection = sortingColumns.get(columnName);
      if (!sortDirection) {
        sortingColumns.set(columnName, SortDirection.ASC);
      } else if (sortDirection === SortDirection.ASC) sortingColumns.set(columnName, SortDirection.DESC);
      else sortingColumns.delete(columnName);

      const sortArray: string[] = [];
      sortingColumns.forEach((value, key) => {
        sortArray.push(key + SORT_TUPLE_SEPARATOR + value);
      });

      setSortingColumns(sortingColumns);

      setFilterSpecification((state) => {
        return { ...state, sort: sortArray, page: 0 };
      });
    },
    [setFilterSpecification, sortingColumns],
  );

  const clearFilters = useCallback(() => {
    setFilterSpecification((state) => ({ ...state, filter: [] }));
  }, [setFilterSpecification]);

  return {
    sortingColumns,
    setSortingColumns,
    filterSpecification,
    setFilterSpecification,
    changeFilterCriteria,
    changePaginationPage,
    changeColumnSort,
    clearFilters,
  };
};
