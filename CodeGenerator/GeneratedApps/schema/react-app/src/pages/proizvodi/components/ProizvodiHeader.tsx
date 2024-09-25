import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import { FilterContainer, FilterIcon, IndexAddButton, IndexPageHeader } from "../../../generalComponents";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../../styles/modal.css";
import { ProizvodiContext } from "../service/ProizvodiContext";
import { ProizvodiModal } from "./ProizvodiModal";
import { useAbility } from "../../../router/casl/AbilityContext";
import { ProizvodiColumns } from "../types";

export const ProizvodiHeader: React.FC = () => {
  const { ability } = useAbility();
  const {
    setOpenProizvodiModal,
    isExpandedFilterContainer,
    setExpandedFilterContainer,
    isEnabledTableActions,
    predefinedFilterCriteria,
    changeFilterCriteria,
    clearFilters,
  } = useContext(ProizvodiContext);

  const isVisibleAddButton = useMemo(() => {
    return Boolean(isEnabledTableActions && ability.can("PROIZVODI_CREATE", "PROIZVODI_CREATE"));
  }, [isEnabledTableActions, ability]);

  return (
    <React.Fragment>
      <IndexPageHeader>
        <IndexAddButton isVisible={isVisibleAddButton} openModal={(open: boolean) => setOpenProizvodiModal?.(open)} />
        <FilterIcon onClick={() => setExpandedFilterContainer?.((state: boolean) => !state)} />
      </IndexPageHeader>
      <FilterContainer
        tableColumnsConfig={ProizvodiColumns}
        predefinedFilterCriteria={predefinedFilterCriteria}
        changeFilterCriteria={changeFilterCriteria}
        isExpandedFilterContainer={isExpandedFilterContainer}
        setExpandedFilterContainer={setExpandedFilterContainer}
        clearFilters={clearFilters}
      />
      <ProizvodiModal />
    </React.Fragment>
  );
};
