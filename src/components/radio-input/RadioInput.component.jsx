import React, { Fragment } from "react";

import "./Radio.styles.scss";

const RadioInput = ({
  id,
  label,
  name,
  inputValue,
  onChangeHandler,
  type,
  checked,
}) => {
  return (
    <Fragment>
      <div className="form-group radio-inputs">
        <input
          className="radio-input"
          type={type}
          id={id}
          name={name}
          value={inputValue}
          onChange={onChangeHandler}
          checked={checked}
          onClick={() => console.log("input click")}
        />
        <label
          onClick={() => console.log("label click")}
          className="radio-label"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </Fragment>
  );
};

RadioInput.defaultProps = {
  type: "radio",
  checked: "false",
};

export default RadioInput;
