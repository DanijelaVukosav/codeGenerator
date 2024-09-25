import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import { FilterContainer, FilterIcon, IndexAddButton, IndexPageHeader } from "../../../generalComponents";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../../styles/modal.css";
import { NarudzbeContext } from "../service/NarudzbeContext";
import { NarudzbeModal } from "./NarudzbeModal";
import { useAbility } from "../../../router/casl/AbilityContext";
import { NarudzbeColumns } from "../types";

export const NarudzbeHeader: React.FC = () => {
  const { ability } = useAbility();
  const {
    setOpenNarudzbeModal,
    isExpandedFilterContainer,
    setExpandedFilterContainer,
    isEnabledTableActions,
    predefinedFilterCriteria,
    changeFilterCriteria,
    clearFilters,
  } = useContext(NarudzbeContext);

  const isVisibleAddButton = useMemo(() => {
    return Boolean(isEnabledTableActions && ability.can("NARUDZBE_CREATE", "NARUDZBE_CREATE"));
  }, [isEnabledTableActions, ability]);

  return (
    <React.Fragment>
      <IndexPageHeader>
        <IndexAddButton isVisible={isVisibleAddButton} openModal={(open: boolean) => setOpenNarudzbeModal?.(open)} />
        <FilterIcon onClick={() => setExpandedFilterContainer?.((state: boolean) => !state)} />
      </IndexPageHeader>
      <FilterContainer
        tableColumnsConfig={NarudzbeColumns}
        predefinedFilterCriteria={predefinedFilterCriteria}
        changeFilterCriteria={changeFilterCriteria}
        isExpandedFilterContainer={isExpandedFilterContainer}
        setExpandedFilterContainer={setExpandedFilterContainer}
        clearFilters={clearFilters}
      />
      <NarudzbeModal />
    </React.Fragment>
  );
};
