import React from "react";

import "./InputForm.scss";

const InputForm = ({
  id,
  label,
  name,
  inputValue,
  onChangeHandler,
  placeholder,
  type,
}) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        value={inputValue}
        onChange={onChangeHandler}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

InputForm.defaultProps = {
  type: "text",
};

export default InputForm;
