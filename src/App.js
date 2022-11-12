import React, { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navigation from "./routes/navigation/Navigation.component";
import Login from "./routes/login/Login.component";
import Register from "./routes/register/Register.component";
import Dashboard from "./routes/dashboard/Dashboard.component";

import "./index.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Navigation />
      <div className="container">
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
