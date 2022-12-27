import React from "react";

import AddLink from "../../components/add-link/AddLink.component";

import "./Homepage.styles.scss";

const Homepage = () => {
  return (
    <div className="home-page">
      <h3>Welcome to Dairy Farm Management System</h3>
      <div className="home-btns">
        <AddLink addLink="/login" linkText="Login" />
        <AddLink addLink="/register" linkText="Regiser" />
      </div>
    </div>
  );
};

export default Homepage;
