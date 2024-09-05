import * as React from "react";
import { useContext, useMemo } from "react";
import "../../../styles/index.css";
import "../../../styles/utils.css";
import { FilterContainer, FilterIcon, IndexAddButton, IndexPageHeader } from "../../../generalComponents";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../../styles/modal.css";
import { #{FUL_TABLE_NAME}#Context } from "../service/#{FUL_TABLE_NAME}#Context";
import { #{FUL_TABLE_NAME}#Modal } from "./#{FUL_TABLE_NAME}#Modal";
import { useAbility } from "../../../router/casl/AbilityContext";
import { #{FUL_TABLE_NAME}#Columns } from "../types";

export const #{FUL_TABLE_NAME}#Header: React.FC = () => {
  const { ability } = useAbility();
  const {
    setOpen#{FUL_TABLE_NAME}#Modal,
    isExpandedFilterContainer,
    setExpandedFilterContainer,
    isEnabledTableActions,
    predefinedFilterCriteria,
    changeFilterCriteria,
    clearFilters,
  } = useContext(#{FUL_TABLE_NAME}#Context);

  const isVisibleAddButton = useMemo(() => {
    return Boolean(isEnabledTableActions && ability.can("#{AUL_TABLE_NAME}#_CREATE", "#{AUL_TABLE_NAME}#_CREATE"));
  }, [isEnabledTableActions, ability]);

  return (
    <React.Fragment>
      <IndexPageHeader>
        <IndexAddButton isVisible={isVisibleAddButton} openModal={(open: boolean) => setOpen#{FUL_TABLE_NAME}#Modal?.(open)} />
        <FilterIcon onClick={() => setExpandedFilterContainer?.((state: boolean) => !state)} />
      </IndexPageHeader>
      <FilterContainer
        tableColumnsConfig={#{FUL_TABLE_NAME}#Columns}
        predefinedFilterCriteria={predefinedFilterCriteria}
        changeFilterCriteria={changeFilterCriteria}
        isExpandedFilterContainer={isExpandedFilterContainer}
        setExpandedFilterContainer={setExpandedFilterContainer}
        clearFilters={clearFilters}
      />
      <#{FUL_TABLE_NAME}#Modal />
    </React.Fragment>
  );
};
