import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import { FilterContainer, FilterIcon, IndexAddButton, IndexPageHeader } from "../../../generalComponents";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../../styles/modal.css";
import { KorisniciContext } from "../service/KorisniciContext";
import { KorisniciModal } from "./KorisniciModal";
import { useAbility } from "../../../router/casl/AbilityContext";
import { KorisniciColumns } from "../types";

export const KorisniciHeader: React.FC = () => {
  const { ability } = useAbility();
  const {
    setOpenKorisniciModal,
    isExpandedFilterContainer,
    setExpandedFilterContainer,
    isEnabledTableActions,
    predefinedFilterCriteria,
    changeFilterCriteria,
    clearFilters,
  } = useContext(KorisniciContext);

  const isVisibleAddButton = useMemo(() => {
    return Boolean(isEnabledTableActions && ability.can("KORISNICI_CREATE", "KORISNICI_CREATE"));
  }, [isEnabledTableActions, ability]);

  return (
    <React.Fragment>
      <IndexPageHeader>
        <IndexAddButton isVisible={isVisibleAddButton} openModal={(open: boolean) => setOpenKorisniciModal?.(open)} />
        <FilterIcon onClick={() => setExpandedFilterContainer?.((state: boolean) => !state)} />
      </IndexPageHeader>
      <FilterContainer
        tableColumnsConfig={KorisniciColumns}
        predefinedFilterCriteria={predefinedFilterCriteria}
        changeFilterCriteria={changeFilterCriteria}
        isExpandedFilterContainer={isExpandedFilterContainer}
        setExpandedFilterContainer={setExpandedFilterContainer}
        clearFilters={clearFilters}
      />
      <KorisniciModal />
    </React.Fragment>
  );
};
