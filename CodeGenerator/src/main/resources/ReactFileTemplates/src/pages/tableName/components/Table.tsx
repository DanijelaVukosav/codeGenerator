import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import {
  IndexTableBody,
  IndexTableHeader,
  IndexTableRow,
  IndexTableWrapper,
  PageLoader,
  PREDEFINED_PAGE_SIZES,
  TableColumnType,
  TableHeaderCel,
  TablePagination
} from "../../../generalComponents";
import TableRow from "./#{FUL_TABLE_NAME}#TableRow";
import { #{FUL_TABLE_NAME}#, #{FUL_TABLE_NAME}#Columns } from "../types";

export const #{FUL_TABLE_NAME}#Table: React.FC = () => {
  const {
    isReady,
    hasError,
    sortingColumns,
    filteredObjects,
    changeColumnSort,
    numberOfPages,
    pageSize,
    changePaginationPage,
    changePageSize,
    isEnabledTableActions
  } = useContext(#{FUL_TABLE_NAME}#Context);

  const tableColumns = useMemo(() => {
    return #{FUL_TABLE_NAME}#Columns.filter((column: TableColumnType) => column.isVisibleOnTable);
  }, []);

  return !isReady ? (
    <PageLoader />
  ) : (
    <React.Fragment>
      <IndexTableWrapper>
        <IndexTableHeader>
          <IndexTableRow>
            {tableColumns.map((columnSettings, index) => {
              return (
                <TableHeaderCel
                  key={"#{FLL_TABLE_NAME}#" + index}
                  label={columnSettings.label}
                  hasSort={columnSettings.hasSort}
                  sortingDirection={sortingColumns.get(columnSettings.key)}
                  onClick={() => changeColumnSort(columnSettings.key)}
                />
              );
            })}
            {isEnabledTableActions && (
              <th className="text-center" colSpan={1}>
                Actions
              </th>
            )}
          </IndexTableRow>
        </IndexTableHeader>
        <IndexTableBody>
          {filteredObjects?.map((object: #{FUL_TABLE_NAME}#, i: number) => {
            return <TableRow key={"#{FLL_TABLE_NAME}#" + i} index={i + 1} data={object} />;
          })}
          {hasError && (
            <tr>
              <td colSpan={tableColumns.length + (isEnabledTableActions ? 2 : 0)} className="text-center">
                <div className="alert alert-danger" role="alert">
                  No Data!
                </div>
              </td>
            </tr>
          )}
        </IndexTableBody>
      </IndexTableWrapper>
      <TablePagination
        numberOfPages={numberOfPages}
        onPageChange={changePaginationPage}
        pageSize={pageSize}
        definePageSizes={PREDEFINED_PAGE_SIZES}
        onPageSizeChange={changePageSize}
      />
    </React.Fragment>
  );
};
