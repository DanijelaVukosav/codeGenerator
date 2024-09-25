import * as React from "react";
import "../../styles/index.css";
import "../../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { KorisniciContext, KorisniciContextProvider } from "./service/KorisniciContext";
import { KorisniciTable } from "./components/KorisniciTable";
import { KorisniciHeader } from "./components/KorisniciHeader";
import { FC, ReactNode, useContext } from "react";
import { Korisnici } from "./types";
import { FilterCriteria } from "../../api/generalService/types";
import { IndexTitle } from "../../generalComponents";

type IndexProps = {
  objects?: Korisnici[];

  onRowSelect?: (_korisnici: Korisnici) => void;
  selectedRowId?: string | number;
  isEnabledTableActions?: boolean;
  predefinedFilterCriteria?: FilterCriteria;
};

export const KorisniciIndex: React.FC<IndexProps> = (props) => {
  return (
    <KorisniciContextProvider
      objects={props.objects}
      isEnabledTableActions={props.isEnabledTableActions}
      onRowSelect={props.onRowSelect}
      selectedRowId={props.selectedRowId}
      predefinedFilterCriteria={props.predefinedFilterCriteria}
    >
      <IndexWrapper>
        <React.Fragment>
          <IndexTitle title={"KORISNICI"} />
          <KorisniciHeader />
          <KorisniciTable />
        </React.Fragment>
      </IndexWrapper>
    </KorisniciContextProvider>
  );
};

const IndexWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isEnabledTableActions } = useContext(KorisniciContext);
  return (
    <div className={`index_wrapper ${isEnabledTableActions ? "index_left_padding" : ""}`}>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};
export default KorisniciIndex;

