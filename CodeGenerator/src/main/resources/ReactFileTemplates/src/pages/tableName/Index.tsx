import * as React from "react";
import "../../styles/index.css";
import "../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { #{FUL_TABLE_NAME}#Context, #{FUL_TABLE_NAME}#ContextProvider } from "./service/#{FUL_TABLE_NAME}#Context";
import { #{FUL_TABLE_NAME}#Table } from "./components/#{FUL_TABLE_NAME}#Table";
import { #{FUL_TABLE_NAME}#Header } from "./components/#{FUL_TABLE_NAME}#Header";
import { FC, ReactNode, useContext } from "react";
import { #{FUL_TABLE_NAME}# } from "./types";
import { FilterCriteria } from "../../api/generalService/types";
import { IndexTitle } from "../../generalComponents";

interface IndexProps {
  objects?: #{FUL_TABLE_NAME}#[];

  onRowSelect?: (_#{FLL_TABLE_NAME}#: #{FUL_TABLE_NAME}#) => void;
  selectedRowId?: string | number;
  isEnabledTableActions?: boolean;
  predefinedFilterCriteria?: FilterCriteria;
};

export const #{FUL_TABLE_NAME}#Index: React.FC<IndexProps> = (props) => {
  return (
    <#{FUL_TABLE_NAME}#ContextProvider
      objects={props.objects}
      isEnabledTableActions={props.isEnabledTableActions}
      onRowSelect={props.onRowSelect}
      selectedRowId={props.selectedRowId}
      predefinedFilterCriteria={props.predefinedFilterCriteria}
    >
      <IndexWrapper>
        <React.Fragment>
          <IndexTitle title={"#{AUL_TABLE_NAME}#"} />
          <#{FUL_TABLE_NAME}#Header />
          <#{FUL_TABLE_NAME}#Table />
        </React.Fragment>
      </IndexWrapper>
    </#{FUL_TABLE_NAME}#ContextProvider>
  );
};

const IndexWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isEnabledTableActions } = useContext(#{FUL_TABLE_NAME}#Context);
  return (
    <div className={`index_wrapper ${isEnabledTableActions ? "index_left_padding" : ""}`}>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};
export default #{FUL_TABLE_NAME}#Index;

