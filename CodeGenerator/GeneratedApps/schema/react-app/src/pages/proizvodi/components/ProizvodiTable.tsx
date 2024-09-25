import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ProizvodiContext } from "../service/ProizvodiContext";
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
import TableRow from "./ProizvodiTableRow";
import { Proizvodi, ProizvodiColumns } from "../types";

export const ProizvodiTable: React.FC = () => {
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
  } = useContext(ProizvodiContext);

  const tableColumns = useMemo(() => {
    return ProizvodiColumns.filter((column: TableColumnType) => column.isVisibleOnTable);
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
                  key={"proizvodi" + index}
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
          {filteredObjects?.map((object: Proizvodi, i: number) => {
            return <TableRow key={"proizvodi" + i} index={i + 1} data={object} />;
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
