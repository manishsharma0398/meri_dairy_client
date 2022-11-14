import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentUser,
  logOutUser,
  setCurrentUserError,
} from "../../store/user/user-action-creator";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    logOutUser();
    dispatch(setCurrentUser(null));
    dispatch(setCurrentUserError({ error: false, errorMsg: "" }));
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <div className="logo-container">
        <Link className="logo" to="/animals">
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
            <Link onClick={logOutHandler} to="#">
              Log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
