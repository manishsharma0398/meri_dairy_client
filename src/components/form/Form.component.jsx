import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/button/Button.component";

const FormComponent = ({
  formHeading,
  onSubmitFormHandler,
  error,
  errorMsg,
  children,
  btnText,
  helper,
}) => {
  return (
    <div className="auth">
      <h2 className="auth-title">{formHeading}</h2>
      <form className="auth-form" onSubmit={onSubmitFormHandler}>
        {error && <span className="err-msg">{errorMsg}</span>}
        {children}
        <Button text={btnText} type="submit" />
        {helper}
      </form>
    </div>
  );
};

FormComponent.propTypes = {
  formHeading: PropTypes.string.isRequired,
  onSubmitFormHandler: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string,
  children: PropTypes.element.isRequired,
  btnText: PropTypes.string.isRequired,
  helper: PropTypes.element,
};

export default FormComponent;
