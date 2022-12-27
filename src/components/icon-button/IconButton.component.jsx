import React from "react";

import Google from "../../assets/google.png";

import "../button/Button.styles.scss";

const IconButton = ({ iconName, text, onBtnClick }) => {
  return (
    <button onClick={onBtnClick} className="btn inverted">
      <div className="btn-body">
        {iconName === "google" && <img src={Google} alt="google" />}
        {text}
      </div>
    </button>
  );
};

export default IconButton;
