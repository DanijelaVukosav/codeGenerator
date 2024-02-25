import * as React from "react";

interface Props {
  name: string;
  placeholder?: string;
  onChange: (fieldName: string, value: string) => void;
  error?: string;
}

export const RadioInput: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      <input
        type="radio"
        id="M"
        name="pol"
        value="M"
        onChange={onChangeInput(props)}
      />
      <label htmlFor="M">Muski</label>
      &nbsp;
      <input
        type="radio"
        id="Z"
        name="pol"
        value="Z"
        onChange={onChangeInput(props)}
      />
      <label htmlFor="Z">Zenski</label>
      <br />
      <br />
    </div>
  );
};

const onChangeInput =
  (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.name, e.target.value);
  };
