import React from "react";

const Dropdown = ({
  label,
  id,
  placeholder,
  name,
  onChangeHandler,
  inputValue,
  children,
  dropdownError,
  required,
}) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        className={dropdownError ? "input-error" : ""}
        value={inputValue}
        onChange={onChangeHandler}
        name={name}
        id={id}
      >
        <option className="default-option" value="#">
          {placeholder}
        </option>
        {children}
      </select>
      {dropdownError && <span className="err-msg">{dropdownError}</span>}
    </div>
  );
};

export default Dropdown;
