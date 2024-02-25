import { isEmpty, isNil } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as toastr from "toastr";
import BaseService from "../generalService/Service";
import TableRow from "./components/TableRow";
import { {FL_TABLE_NAME}  } from "./types";
import { PATH_ROOT, PATH_SEPARATOR } from "./service/{TABLE_SERVICE}";
import { GeneralInput } from "../generalComponents/GeneralInput";

type IndexProps = {
  objects?: {FL_TABLE_NAME}[];
};

export const {INDEX_TABLE_NAME}: React.FC<IndexProps> = (props) => {
  const [objects, setObjects] = React.useState<{FL_TABLE_NAME}[] | undefined>(
    props.objects
  );
  const [isReady, setReady] = React.useState<boolean>(props.objects ? true : false);
  const [hasError, setError] = React.useState<boolean>(false);

   const [filterType, setFilterType] = React.useState<string>("{TABLE_PRIMARY_KEY_COLUMN}");
  const [searchText, setSearchText] = React.useState<string>('');
  const [filteredObjects, setFilteredObjects] = React.useState<{FL_TABLE_NAME}[] | undefined>(props.objects);

  const loadData = async () => {
    BaseService.getAll<{FL_TABLE_NAME}>(PATH_ROOT).then((rp) => {
      if (rp.Status) {
        const data = rp.Data;
        setObjects(data);
        setFilteredObjects(data);
        setReady(true);
      } else {
        setReady(true);
        setError(true);
      }
    });
  };

  useEffect(() => {
    if (isEmpty(objects)) loadData();
    const timeout = setTimeout(() => {
      if (!isReady) {
        toastr.info(
          "It is possible that the service is being restarted, please wait more ...",
          "",
          { timeOut: 8000 }
        );
      }

      if (hasError) {
        toastr.error("An error occurred!", "", { timeOut: 8000 });
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isReady, hasError]);

   const changeFilterType = (event: any) => {
    setFilterType(event.target?.value);
  }

  const changeSearchText = (name: any,value: any) => {
    setSearchText(value?? "");
  }
  useEffect(() => {
    if (isNil(searchText) || searchText === "")
      setFilteredObjects(objects);
    else {
      setFilteredObjects(objects?.filter((object: any) => {
        return object[filterType as keyof {FL_TABLE_NAME}]?.toString().includes(searchText);
      }));
    }
    
  }, [searchText,filterType]);


  return (
    <div>
      <h3 className="text-center">{ABL_TABLE_NAME}</h3>
      <br />
      <Link to={ PATH_ROOT + PATH_SEPARATOR + "create"} className="nav-link">
        ADD NEW OBJECT
      </Link>
      <div className="form-group col-md-4">
        <GeneralInput
          type={"text"}
          name="searchText"
          onChange={changeSearchText}
          label={"Search"}
        />
        <label htmlFor="filterSelector">Filter type</label>
        <select
          id="filterSelector"
          className="form-control"
          onChange={changeFilterType}
        >
          {TABLE_FILTER_OPTIONS}
        </select>
      </div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead className="thead-dark">
          <tr>
            <th>Index</th>
            {HEADER_OF_INDEX_TABLE}
            <th className="text-center" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredObjects?.map(function (object, i) {
            return <TableRow key={i} index={i + 1} data={object} />;
          })}
          {!isReady && (
            <tr>
              <td colSpan={6} className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
          {hasError && (
            <tr>
              <td colSpan={6} className="text-center">
                <div className="alert alert-danger" role="alert">
                  An error occurred!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default {INDEX_TABLE_NAME};
