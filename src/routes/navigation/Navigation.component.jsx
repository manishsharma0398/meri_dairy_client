import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <nav className="navigation">
      <div className="logo-container">
        <Link className="logo" to="/">
          Dairy
        </Link>
      </div>
      <ul className="nav-links">
        {!currentUser && (
          <li className="nav-links-item">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!currentUser && (
          <li className="nav-links-item">
            <Link to="/register">Register</Link>
          </li>
        )}
        {currentUser && (
          <li className="nav-links-item">
            <Link to="#">Log out</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
