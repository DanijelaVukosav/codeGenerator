import * as React from "react";
import { FC, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { #{FUL_TABLE_NAME}#, #{FUL_TABLE_NAME}#Columns } from "../types";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import { useAbility } from "../../../router/casl/AbilityContext";
import { Button, DeleteButton, EditButton, PageTabs, Tab } from "../../../generalComponents";
import { FilterCriteriaOperator } from "../../../api/generalService/types";
import { ObjectDetails } from "../../../generalComponents/singlePage/ObjectDetails";
#{IMPORT_PAGE_OF_FOREIGN_TABLES}#
#{IMPORT_INDEX_TABLE_WHICH_REFERENCE_THIS_TABLE}#


const #{FUL_TABLE_NAME}#Data: FC = () => {
  const { ability } = useAbility();
  const navigate = useNavigate();
  const { singleObject, openEdit#{FUL_TABLE_NAME}#Modal, onDelete#{FUL_TABLE_NAME}#, isEnabledTableActions } = useContext(#{FUL_TABLE_NAME}#Context);

  const pageTabs = useMemo(() => {
    const tabs: Tab[] = [];
    #{INDEX_OF_TABLES_WHICH_REFERENCE_THIS_TABLE}#
    return tabs;
  }, [ability, singleObject]);

  const onEditClick = useCallback(()=>{
    if (singleObject) {
      openEdit#{FUL_TABLE_NAME}#Modal(singleObject);
    }
  },[singleObject, openEdit#{FUL_TABLE_NAME}#Modal]);

  return (
    <React.Fragment>
      {Boolean(singleObject) && (
          <React.Fragment>
            <h2 style={{paddingBottom: '30px'}}>#{FUL_TABLE_NAME}#</h2>
            <ObjectDetails<#{FUL_TABLE_NAME}#> object={singleObject} fields={#{FUL_TABLE_NAME}#Columns}/>
            #{PAGE_OF_FOREIGN_TABLES}#
            {isEnabledTableActions && (
                <React.Fragment>
                  <div>
                    <EditButton
                        abilitySubject={"#{AUL_TABLE_NAME}#_UPDATE"}
                        onClick={onEditClick}
                        customStyle={"width_80px"}
                    >
                      Edit
                    </EditButton>
                    &nbsp; &nbsp;
                    <DeleteButton
                        abilitySubject={"#{AUL_TABLE_NAME}#_DELETE"}
                        onClick={() => {
                          onDelete#{FUL_TABLE_NAME}#
                          (singleObject?.#{TABLE_PRIMARY_KEY_COLUMN}# ??-1);
                        }}
                        customStyle={"width_80px"}
                    >
                      Delete
                    </DeleteButton>
                  </div>
                  <PageTabs tabs={pageTabs}/>
                  <div style={{paddingTop: "20px"}}>
                    <Button
                        label="Go Back"
                        className="btn btn-success"
                        onClick={() => {
                          navigate(-1);
                        }}
                    />
                  </div>
                </React.Fragment>
            )}
          </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default #{FUL_TABLE_NAME}#Data;
