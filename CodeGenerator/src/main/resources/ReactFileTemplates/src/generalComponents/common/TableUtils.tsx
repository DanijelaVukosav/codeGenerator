import * as React from "react";
import { FC, useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { SortDirection } from "../../api/generalService/types";
import "../../styles/index.css";
import "../../styles/utils.css";
import Dropdown from "./Dropdown";
import { SortDownIcon, SortIcon, SortUpIcon } from "./Sort";

interface TablePaginationProps {
  numberOfPages: number;
  onPageChange: (page: number) => void;
  pageSize: string;
  definePageSizes: string[];
  onPageSizeChange: (pageSize: string) => void;
};

export const TablePagination: FC<TablePaginationProps> = ({ numberOfPages, onPageChange, pageSize, definePageSizes, onPageSizeChange }) => {
  return (
    <React.Fragment>
      <div className="table_pagination">
        <Dropdown options={definePageSizes} isPositionBottom={true} defaultSelectedOption={pageSize} onChange={onPageSizeChange} />
        <Stack spacing={1} className="page-font">
          <Pagination
            count={numberOfPages}
            variant="outlined"
            shape="rounded"
            onChange={(_event: React.ChangeEvent<unknown>, page: number) => onPageChange(page)}
            className="page-font"
          />
        </Stack>
      </div>
    </React.Fragment>
  );
};

interface TableHeaderCelProps {
  label: string;
  hasSort?: boolean;
  sortingDirection?: string;
  onClick?: (event: React.ChangeEvent<unknown>) => void;
};

export const TableHeaderCel: FC<TableHeaderCelProps> = ({ label, onClick, hasSort, sortingDirection }) => {
  const sortIconSrc = useMemo(() => {
    switch (true) {
      case !hasSort:
        return <></>;
      case sortingDirection === SortDirection.ASC:
        return <SortDownIcon />;
      case sortingDirection === SortDirection.DESC:
        return <SortUpIcon />;
      default:
        return <SortIcon />;
    }
  }, [hasSort, sortingDirection]);
  return (
    <th onClick={hasSort ? onClick : undefined}>
      {label.toUpperCase()}
      {sortIconSrc}
    </th>
  );
};
