import React from "react";
import "../../styles/utils.css";
import "../../styles/filterContainer.css";

interface Props {
  onClick: () => void;
}

export const FilterIcon: React.FunctionComponent<Props> = (props) => {
  return (
    <span className="padding-20" onClick={props.onClick}>
      <img src="/svg/filter.png" alt="An example icon" style={{ height: "auto", width: "60px", marginRight: "20px" }} />
    </span>
  );
};

interface FilterContainerWrapperProps {
  hidden: boolean;
  children?: React.ReactNode;
}

export const FilterContainerWrapper: React.FunctionComponent<FilterContainerWrapperProps> = ({ hidden, children }) => {
  return (
    <div className="flex_end" hidden={hidden}>
      <div className="filter_layout">{children}</div>
    </div>
  );
};
