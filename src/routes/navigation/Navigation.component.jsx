import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentUser,
  logOutUser,
  setCurrentUserError,
} from "../../store/user/user-action-creator";
import { setAnimalDetails } from "../../store/animal/animal-action-creator";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      await logOutUser();
      dispatch(setCurrentUser(null));
      dispatch(setCurrentUserError({ error: false, errorMsg: "" }));
      dispatch(setAnimalDetails(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navigation">
      <div className="logo-container">
        <Link className="logo" to="/animals">
          Dairy
        </Link>
      </div>
      {!currentUser && (
        <ul className="nav-links">
          <li className="nav-links-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-links-item">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
      {currentUser && (
        <ul className="nav-links">
          <li className="nav-links-item">
            <Link to="/animals">Animals</Link>
          </li>
          <li className="nav-links-item">
            <Link to="/milk">Milk</Link>
          </li>
          <li className="nav-links-item">
            <Link to="/health">Health</Link>
          </li>
          <li className="nav-links-item">
            <Link onClick={logOutHandler} to="#">
              Log out
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
