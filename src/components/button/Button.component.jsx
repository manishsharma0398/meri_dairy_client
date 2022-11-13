import React from "react";

import "./Button.styles.scss";

const Button = ({ type, text }) => {
  return (
    <button className="btn" type={type}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
