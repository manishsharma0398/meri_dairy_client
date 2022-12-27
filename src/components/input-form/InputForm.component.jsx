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
  required,
  inputError,
}) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        className={inputError ? "input-error" : ""}
        value={inputValue}
        onChange={onChangeHandler}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        error={inputError}
      />
      {inputError && <span className="err-msg">{inputError}</span>}
    </div>
  );
};

InputForm.defaultProps = {
  type: "text",
  required: false,
};

export default InputForm;
