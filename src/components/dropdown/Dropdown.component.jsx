import React from "react";

const Dropdown = ({
  label,
  id,
  placeholder,
  name,
  onChangeHandler,
  inputValue,
  children,
}) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select value={inputValue} onChange={onChangeHandler} name={name} id={id}>
        <option className="default-option" value="#">
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
};

export default Dropdown;
