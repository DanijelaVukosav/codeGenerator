import * as React from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
}

export const TextInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <input
          type="text"
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          defaultValue={props.value}
          onChange={onChangeInput(props)}
        />
      </div>
      <div className="help-block">{props.error}</div>
      <br />
    </div>
  );
};

const formatWrapperClass = (props: Props) => {
  const wrapperClass = "form-group";

  return props.error ? `${wrapperClass} has-error` : wrapperClass;
};

const onChangeInput =
  (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Pozove on change", e.target.name,e.target.value);
    props.onChange(e.target.name, e.target.value);
  };
