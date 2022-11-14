import React, { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navigation from "./routes/navigation/Navigation.component";
import Login from "./routes/login/Login.component";
import Register from "./routes/register/Register.component";
import Dashboard from "./routes/dashboard/Dashboard.component";
import Animal from "./routes/animal/Animal.component";
import Homepage from "./routes/homepage/Homepage.component";

import {
  getUserDataOnRefresh,
  setCurrentUser,
} from "./store/user/user-action-creator";

import "./index.css";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const userLoggedIn = await getUserDataOnRefresh();
      console.log(userLoggedIn);
      if (!userLoggedIn) return;

      dispatch(setCurrentUser(userLoggedIn));
      navigate("/animals");
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Navigation />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/animals" element={<Dashboard />}></Route>
          <Route exact path="/animals/:animalId" element={<Animal />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
