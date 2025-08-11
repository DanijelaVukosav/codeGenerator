import * as React from "react";
import "../../../styles/singlePage.css";
import "../../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { #{FUL_TABLE_NAME}#ContextProvider } from "../service/#{FUL_TABLE_NAME}#Context";
import #{FUL_TABLE_NAME}#Data from "./#{FUL_TABLE_NAME}#Data";
import { useParams } from "react-router-dom";
import { #{FUL_TABLE_NAME}#Modal } from "../components/#{FUL_TABLE_NAME}#Modal";
import { SinglePageWrapper } from "../../../generalComponents";

interface #{FUL_TABLE_NAME}#PageProps {
  objectId?: string | number;
  simpleView?: boolean;
}

export const #{FUL_TABLE_NAME}#Page: React.FC<#{FUL_TABLE_NAME}#PageProps> = (props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <#{FUL_TABLE_NAME}#ContextProvider objectId={props.objectId ?? id} isEnabledTableActions={!props?.simpleView}>
      <SinglePageWrapper simpleView={props?.simpleView ?? false}>
        <React.Fragment>
          <#{FUL_TABLE_NAME}#Data />
          <#{FUL_TABLE_NAME}#Modal />
        </React.Fragment>
      </SinglePageWrapper>
    </#{FUL_TABLE_NAME}#ContextProvider>
  );
};

export default #{FUL_TABLE_NAME}#Page;
