import React from "react";

import "./Button.styles.scss";

const Button = ({ type, text, disabled }) => {
  return (
    <button disabled={disabled} className="btn" type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
