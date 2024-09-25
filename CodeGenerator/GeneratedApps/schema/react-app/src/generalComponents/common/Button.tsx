import * as React from "react";
import { useAbility } from "../../router/casl/AbilityContext";

interface Props {
  label: string;
  className: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export const Button: React.FunctionComponent<Props> = (props) => {
  return (
    <button type="button" className={props.className} onClick={props.onClick}>
      {props.children}
      {props.label}
    </button>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  customStyle?: string;
  abilitySubject?: string;
}

export const EditButton: React.FunctionComponent<ActionButtonProps> = (props) => {
  const { ability } = useAbility();

  return props.abilitySubject && !ability.can(props.abilitySubject, props.abilitySubject) ? (
    <></>
  ) : (
    <button onClick={props.onClick} className={`btn btn-primary margin-right-20 ${props.customStyle ?? ""}`}>
      <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
      {props.children && <div className={"margin-left-5"}>{props.children}</div>}
    </button>
  );
};

export const DeleteButton: React.FunctionComponent<ActionButtonProps> = (props) => {
  const { ability } = useAbility();

  return props.abilitySubject && !ability.can(props.abilitySubject, props.abilitySubject) ? (
    <></>
  ) : (
    <button onClick={props.onClick} className={`btn btn-danger ${props?.customStyle ?? ""}`}>
      <i className="fa fa-trash"></i>
      {props.children && <div className={"margin-left-5"}>{props.children}</div>}
    </button>
  );
};
