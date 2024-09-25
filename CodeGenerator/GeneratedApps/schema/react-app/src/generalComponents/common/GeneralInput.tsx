import * as React from "react";

interface Props {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: any;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
  step?: number;
  min?: number;
  max?: number;
}

export const GeneralInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={formatWrapperClass(props)}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className="field">
        <input
          type={props.type}
          name={props.name}
          className="form-control"
          placeholder={props.placeholder}
          value={props.value}
          onChange={onChangeInput(props)}
          step={props.step}
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

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
  props.onChange(e.target.name, e.target.value);
};
