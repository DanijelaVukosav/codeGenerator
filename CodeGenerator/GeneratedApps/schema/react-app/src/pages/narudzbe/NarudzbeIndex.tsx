import * as React from "react";
import "../../styles/index.css";
import "../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NarudzbeContext, NarudzbeContextProvider } from "./service/NarudzbeContext";
import { NarudzbeTable } from "./components/NarudzbeTable";
import { NarudzbeHeader } from "./components/NarudzbeHeader";
import { FC, ReactNode, useContext } from "react";
import { Narudzbe } from "./types";
import { FilterCriteria } from "../../api/generalService/types";
import { IndexTitle } from "../../generalComponents";

type IndexProps = {
  objects?: Narudzbe[];

  onRowSelect?: (_narudzbe: Narudzbe) => void;
  selectedRowId?: string | number;
  isEnabledTableActions?: boolean;
  predefinedFilterCriteria?: FilterCriteria;
};

export const NarudzbeIndex: React.FC<IndexProps> = (props) => {
  return (
    <NarudzbeContextProvider
      objects={props.objects}
      isEnabledTableActions={props.isEnabledTableActions}
      onRowSelect={props.onRowSelect}
      selectedRowId={props.selectedRowId}
      predefinedFilterCriteria={props.predefinedFilterCriteria}
    >
      <IndexWrapper>
        <React.Fragment>
          <IndexTitle title={"NARUDZBE"} />
          <NarudzbeHeader />
          <NarudzbeTable />
        </React.Fragment>
      </IndexWrapper>
    </NarudzbeContextProvider>
  );
};

const IndexWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isEnabledTableActions } = useContext(NarudzbeContext);
  return (
    <div className={`index_wrapper ${isEnabledTableActions ? "index_left_padding" : ""}`}>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};
export default NarudzbeIndex;

