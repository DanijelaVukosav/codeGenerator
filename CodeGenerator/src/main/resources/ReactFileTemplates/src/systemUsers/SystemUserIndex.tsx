import * as React from "react";
import "../styles/index.css";
import "../styles/utils.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SystemUsersContextProvider } from "./service/SystemUserContext";
import { SystemUserTable } from "./components/SystemUserTable";
import { SystemUserHeader } from "./components/SystemUserHeader";
import { FC, ReactNode } from "react";
import { IndexTitle } from "../generalComponents";

export const SystemUserIndex: React.FC = () => {
  return (
    <SystemUsersContextProvider>
      <IndexWrapper>
        <React.Fragment>
          <IndexTitle title={"SYSTEM USERS"} />
          <SystemUserHeader />
          <SystemUserTable />
        </React.Fragment>
      </IndexWrapper>
    </SystemUsersContextProvider>
  );
};

const IndexWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="index_wrapper index_left_padding">
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};

export default SystemUserIndex;
