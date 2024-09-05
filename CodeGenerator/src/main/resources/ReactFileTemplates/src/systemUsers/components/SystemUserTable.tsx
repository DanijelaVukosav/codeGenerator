import * as React from "react";
import { useContext, useMemo } from "react";
import "../../styles/index.css";
import "../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SystemUserContext } from "../service/SystemUserContext";
import {
  IndexTableBody,
  IndexTableHeader,
  IndexTableRow,
  IndexTableWrapper,
  PageLoader,
  PREDEFINED_PAGE_SIZES,
  TableColumnType,
  TableHeaderCel,
  TablePagination,
} from "../../generalComponents";
import TableRow from "./TableRow";
import { SystemUserColumns } from "../types";

export const SystemUserTable: React.FC = () => {
  const { isReady, hasError, sortingColumns, filteredObjects, changeColumnSort, numberOfPages, pageSize, changePaginationPage, changePageSize } =
    useContext(SystemUserContext);

  const tableColumns = useMemo(() => {
    return SystemUserColumns.filter((column: TableColumnType) => column.isVisibleOnTable);
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
                  key={"system_user_" + index}
                  label={columnSettings.label}
                  hasSort={columnSettings.hasSort}
                  sortingDirection={sortingColumns.get(columnSettings.key)}
                  onClick={() => changeColumnSort(columnSettings.key)}
                />
              );
            })}
            <th className="text-center" colSpan={1}>
              Actions
            </th>
          </IndexTableRow>
        </IndexTableHeader>
        <IndexTableBody>
          {filteredObjects?.map(function (object, i) {
            return <TableRow key={"system_user|" + i} index={i + 1} data={object} />;
          })}
          {hasError && (
            <tr>
              <td colSpan={tableColumns.length + 2} className="text-center">
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
