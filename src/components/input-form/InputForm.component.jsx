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
  inputErr,
}) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        className={inputErr ? "input-error" : ""}
        value={inputValue}
        onChange={onChangeHandler}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {inputErr && <span className="err-msg">{inputErr}</span>}
    </div>
  );
};

InputForm.defaultProps = {
  type: "text",
  required: false,
};

export default InputForm;
