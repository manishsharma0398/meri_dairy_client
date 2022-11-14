import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h3>Welcome to Dairy Farm Management System</h3>
      <div className="home-btns">
        <Link style={{ display: "inline-block" }} className="btn" to="/login">
          Login
        </Link>

        <Link
          style={{ display: "inline-block" }}
          className="btn"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
