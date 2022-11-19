import React, { Fragment } from "react";

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
    <Fragment>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <select value={inputValue} onChange={onChangeHandler} name={name} id={id}>
        <option value="#">{placeholder}</option>
        {children}
      </select>
    </Fragment>
  );
};

export default Dropdown;
