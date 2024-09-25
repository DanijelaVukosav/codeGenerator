import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NarudzbeContext } from "../service/NarudzbeContext";
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
import TableRow from "./NarudzbeTableRow";
import { Narudzbe, NarudzbeColumns } from "../types";

export const NarudzbeTable: React.FC = () => {
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
  } = useContext(NarudzbeContext);

  const tableColumns = useMemo(() => {
    return NarudzbeColumns.filter((column: TableColumnType) => column.isVisibleOnTable);
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
                  key={"narudzbe" + index}
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
          {filteredObjects?.map((object: Narudzbe, i: number) => {
            return <TableRow key={"narudzbe" + i} index={i + 1} data={object} />;
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
