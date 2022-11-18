import React, { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getUserDataOnRefresh,
  setCurrentUser,
} from "./store/user/user-action-creator";

import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";

import Navigation from "./routes/navigation/Navigation.component";
import Login from "./routes/login/Login.component";
import Register from "./routes/register/Register.component";
import Dashboard from "./routes/dashboard/Dashboard.component";
import Homepage from "./routes/homepage/Homepage.component";
import Animal from "./routes/animal/Animal.component";
import AddAnimal from "./routes/add-animal/AddAnimal.component";
import Milk from "./routes/milk/Milk.component";
import AddMilk from "./routes/add-milk/AddMilk.component";
import Health from "./routes/health/Health.component";
import AddHealth from "./routes/add-health/AddHealth.component";
import Worker from "./routes/workers/Worker.component";
import AddWorker from "./routes/add-worker/AddWorker.component";
import Transaction from "./routes/transaction/Transaction.component";
import AddTransaction from "./routes/add-transaction/AddTransaction";
import Treatment from "./routes/treatment/Treatment.component";
import AddTreatment from "./routes/add-treatment/AddTreatment.component";

import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const userLoggedIn = await getUserDataOnRefresh();
      if (!userLoggedIn) return navigate("/login");
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
          <Route element={<PrivateRoutes />}>
            <Route exact path="/animals" element={<Dashboard />}></Route>
            <Route exact path="/animals/add" element={<AddAnimal />}></Route>
            <Route exact path="/animals/edit" element={<AddAnimal />}></Route>
            <Route exact path="/animals/:animalId" element={<Animal />}></Route>
            <Route exact path="/milk" element={<Milk />}></Route>
            <Route exact path="/milk/add" element={<AddMilk />}></Route>
            <Route
              exact
              path="/milk/edit/:milkId"
              element={<AddMilk />}
            ></Route>
            <Route exact path="/health" element={<Health />}></Route>
            <Route exact path="/health/add" element={<AddHealth />}></Route>
            <Route exact path="/health/edit" element={<AddHealth />}></Route>
            <Route exact path="/workers" element={<Worker />}></Route>
            <Route exact path="/workers/add" element={<AddWorker />}></Route>
            <Route exact path="/workers/edit" element={<AddWorker />}></Route>
            <Route exact path="/transactions" element={<Transaction />}></Route>
            <Route
              exact
              path="/transactions/add"
              element={<AddTransaction />}
            ></Route>
            <Route
              exact
              path="/transactions/edit"
              element={<AddTransaction />}
            ></Route>
            <Route exact path="/treatment" element={<Treatment />}></Route>
            <Route
              exact
              path="/treatment/add"
              element={<AddTreatment />}
            ></Route>
            <Route
              exact
              path="/treatment/edit"
              element={<AddTreatment />}
            ></Route>
          </Route>
          <Route element={<PublicRoutes />}>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
          </Route>
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
