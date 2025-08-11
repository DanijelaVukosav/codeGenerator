import * as React from "react";
import { FC } from "react";

export const FormForeignObjectField: FC<{
  label: string;
  onClick: () => void;
  isEditMode?: boolean;
  selectedObjectLabel?: string;
}> = ({ label, onClick, isEditMode, selectedObjectLabel }) => {
  return (
    <div className="input_container">
      <label className="input_label">{label}</label>
      <div className={"foreign_container"}>
        {selectedObjectLabel && <div className={"chosen_object"}>{selectedObjectLabel}</div>}

        <button title={label} className="foreign_button" onClick={onClick}>
          <img src={isEditMode ? "/svg/edit.svg" : "/svg/add-white.svg"} alt={isEditMode ? "Edit" : "Add"} />
          <span>{label}</span>
        </button>
      </div>
    </div>
  );
};
