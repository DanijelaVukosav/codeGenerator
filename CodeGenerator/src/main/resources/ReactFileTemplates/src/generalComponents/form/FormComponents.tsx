import * as React from "react";
import { FC, ReactNode } from "react";
import "../../styles/form.css";

export const GLOBAL_BOX_STYLE = {
    width: '70vw',
    height: '70vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

export const FormContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="form_wrapper">
      <div className="form_container">{children}</div>
    </div>
  );
};

export const FormTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <React.Fragment>
      <div className="title_container">
        <p className="title">{title}</p>
      </div>
      <br />
    </React.Fragment>
  );
};

export const FormSubmitButton: FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return (
    <button title={label} className="submit_button" onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export const FormErrorMessage: FC<{ message?: string }> = ({ message }) => {
  return message ? <span style={{ color: "#dc3545" }}>{message}</span> : <React.Fragment />;
};
