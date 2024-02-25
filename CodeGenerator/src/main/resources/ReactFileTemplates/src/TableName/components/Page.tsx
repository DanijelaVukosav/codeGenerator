import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import { History } from "history";
import { Link } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import {TABLE_SERVICE}, { {DEFAULT_TABLE_OBJECT} } from "../service/{TABLE_SERVICE}";
import { {FL_TABLE_NAME} } from "../types";
import { Button } from "../../generalComponents/Button";
import { isEmpty, isNil } from "lodash";
import { PATH_ROOT, PATH_SEPARATOR, } from "../service/{TABLE_SERVICE}";
{IMPORT_INDEX_TABLE_WHICH_REFECENCE_THIS_TABLE}
{IMPORT_PAGE_OF_FOREIGN_TABLES}

type PageProps = {
  object?: {FL_TABLE_NAME};
};
export const {PAGE_TABLE_NAME}: FC<PageProps> = (props) => {
  const [object, setObject] = useState<{FL_TABLE_NAME}>(
    props.object ?? {DEFAULT_TABLE_OBJECT}
  );
  const [isReady, setReady] = useState<boolean>(props.object ? true : false);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    if (props.object) return;
    {TABLE_SERVICE}.getById(id).then((data) => {
      data && setObject(data);
      setReady(true);
    });
  }, []);
  return (
    <React.Fragment>
      {isReady ? (
        <React.Fragment>
          <dl className="row">
            {TABLE_OBJECT_DETAILS_NO_FOREIGN_KEY}
          </dl>
          {TABLE_OBJECT_DETAILS_FOREIGN_KEY}
          {isNil(props.object) && (
            <React.Fragment>
              {TABLES_WHICH_REFERENCE_THIS_TABLE}
              {/*{!isEmpty(object.students) && (
                <IndexStudent objects={object.students} />
              )}*/}
            </React.Fragment>
          )}
          <div>
            <Link
              to={
                PATH_ROOT +
                PATH_SEPARATOR +
                "edit" +
                PATH_SEPARATOR +
                props.object?.{TABLE_PRIMARY_KEY_COLUMN}
              }
              className="btn btn-primary"
            >
              Edit
            </Link>
            &nbsp; &nbsp;
            <button
              onClick={async () => {
                await {TABLE_SERVICE}.delete(
                  object.{TABLE_PRIMARY_KEY_COLUMN}
                );
                history.goBack();
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Button
              label="Go Back"
              className="btn btn-success"
              onClick={() => {
                history.goBack();
              }}
            />
          </div>
        </React.Fragment>
      ) : (
        <h2>Loading...</h2>
      )}
    </React.Fragment>
  );
};
