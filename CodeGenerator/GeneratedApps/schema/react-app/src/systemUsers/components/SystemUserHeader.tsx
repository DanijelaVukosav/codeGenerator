import * as React from "react";
import { useContext } from "react";
import "../../styles/index.css";
import "../../styles/utils.css";
import { FilterContainer, FilterIcon, IndexAddButton, IndexPageHeader } from "../../generalComponents";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../styles/modal.css";
import { SystemUserContext } from "../service/SystemUserContext";
import { SystemUserModal } from "./SystemUserModal";
import { SystemUserColumns } from "../types";

export const SystemUserHeader: React.FC = () => {
  const { setOpenUserModal, isExpandedFilterContainer, setExpandedFilterContainer, changeFilterCriteria, clearFilters } =
    useContext(SystemUserContext);

  return (
    <React.Fragment>
      <IndexPageHeader>
        <IndexAddButton isVisible={true} openModal={(open: boolean) => setOpenUserModal?.(open)} />
        <FilterIcon onClick={() => setExpandedFilterContainer?.((state) => !state)} />
      </IndexPageHeader>
      <FilterContainer
        tableColumnsConfig={SystemUserColumns}
        changeFilterCriteria={changeFilterCriteria}
        isExpandedFilterContainer={isExpandedFilterContainer}
        setExpandedFilterContainer={setExpandedFilterContainer}
        clearFilters={clearFilters}
      />
      <SystemUserModal />
    </React.Fragment>
  );
};
