import React from "react";
import { DEFAULT_PAGE_SIZE } from "../generalComponents";

interface PaginationData {
  numberOfPages: number;
  setNumberOfPages: (numberOfPages: number) => void;
  pageSize: string;
  setPageSize: (pageSize: string) => void;
}

export const usePagination: () => PaginationData = () => {
  const [numberOfPages, setNumberOfPages] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<string>(DEFAULT_PAGE_SIZE.toString());

  return { numberOfPages, setNumberOfPages, pageSize, setPageSize };
};
