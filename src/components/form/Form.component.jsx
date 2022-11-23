import React from "react";
import PropTypes from "prop-types";

import Button from "../../components/button/Button.component";

import "./Form.styles.scss";

const FormComponent = ({
  formHeading,
  onSubmitFormHandler,
  children,
  btnText,
  helper,
}) => {
  return (
    <div className="form">
      <h2 className="form-title">{formHeading}</h2>
      <form className="form-body" onSubmit={onSubmitFormHandler}>
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
  children: PropTypes.element.isRequired,
  btnText: PropTypes.string.isRequired,
  helper: PropTypes.element,
};

export default FormComponent;
