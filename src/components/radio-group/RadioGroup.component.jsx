import React, { Fragment } from "react";

const RadioGroup = ({ label, children, required, inputError }) => {
  return (
    <Fragment>
      <label className={`label ${inputError && "err-msg"}`}>
        {label} {required && <span className="required">*</span>}
      </label>
      <br />
      {inputError && <span className="err-msg">Please select one option</span>}
      {children}
    </Fragment>
  );
};

export default RadioGroup;
