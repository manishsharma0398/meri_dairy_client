import React from "react";
import { Link } from "react-router-dom";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo-container">
        <Link className="logo" to="/">
          Dairy
        </Link>
      </div>
      <ul className="nav-links">
        <li className="nav-links-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-links-item">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
