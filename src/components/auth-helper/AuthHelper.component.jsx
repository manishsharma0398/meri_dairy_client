import React from "react";
import { Link } from "react-router-dom";

import "./AuthHelper.styles.scss";

const AuthHelper = ({ helperText, link, linkText }) => {
  return (
    <span className="auth-helper">
      {helperText} <Link to={link}>{linkText}</Link>
    </span>
  );
};

export default AuthHelper;
