import * as React from "react";
import "../../styles/index.css";
import "../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ProizvodiContext, ProizvodiContextProvider } from "./service/ProizvodiContext";
import { ProizvodiTable } from "./components/ProizvodiTable";
import { ProizvodiHeader } from "./components/ProizvodiHeader";
import { FC, ReactNode, useContext } from "react";
import { Proizvodi } from "./types";
import { FilterCriteria } from "../../api/generalService/types";
import { IndexTitle } from "../../generalComponents";

type IndexProps = {
  objects?: Proizvodi[];

  onRowSelect?: (_proizvodi: Proizvodi) => void;
  selectedRowId?: string | number;
  isEnabledTableActions?: boolean;
  predefinedFilterCriteria?: FilterCriteria;
};

export const ProizvodiIndex: React.FC<IndexProps> = (props) => {
  return (
    <ProizvodiContextProvider
      objects={props.objects}
      isEnabledTableActions={props.isEnabledTableActions}
      onRowSelect={props.onRowSelect}
      selectedRowId={props.selectedRowId}
      predefinedFilterCriteria={props.predefinedFilterCriteria}
    >
      <IndexWrapper>
        <React.Fragment>
          <IndexTitle title={"PROIZVODI"} />
          <ProizvodiHeader />
          <ProizvodiTable />
        </React.Fragment>
      </IndexWrapper>
    </ProizvodiContextProvider>
  );
};

const IndexWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isEnabledTableActions } = useContext(ProizvodiContext);
  return (
    <div className={`index_wrapper ${isEnabledTableActions ? "index_left_padding" : ""}`}>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};
export default ProizvodiIndex;

