import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";

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

  const toggleLinks = () => {
    const cl = "mob-links";
    const a = document.querySelector(".nav-links").classList;
    if (a.contains(cl)) return a.remove(cl);
    a.add(cl);
  };

  return (
    <nav className="navigation">
      <div className="container">
        <div className="logo-container">
          <Link className="logo" to={currentUser ? "/animals" : "/"}>
            Dairy
          </Link>

          <GiHamburgerMenu onClick={toggleLinks} className="ham" />
        </div>
        {!currentUser && (
          <ul className="nav-links public-links">
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/login">
                Login
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        {currentUser && (
          <ul className="nav-links private-links">
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/animals">
                Animals
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/milk">
                Milk
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/health">
                Health
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/workers">
                Workers
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/transactions">
                Transactions
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/treatment">
                Treatment
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={toggleLinks} to="/mating">
                Mating
              </Link>
            </li>
            <li className="nav-links-item">
              <Link onClick={logOutHandler} to="#">
                Log out
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
