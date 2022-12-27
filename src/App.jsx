import React, { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import Worker from "./routes/workers/Workers.component";
import AddWorker from "./routes/add-worker/AddWorker.component";
import WorkerItem from "./routes/worker-item/WorkerItem.component";
import Transaction from "./routes/transaction/Transaction.component";
import AddTransaction from "./routes/add-transaction/AddTransaction";
import Treatment from "./routes/treatment/Treatment.component";
import AddTreatment from "./routes/add-treatment/AddTreatment.component";
import Mating from "./routes/mating/Mating.component";
import AddMating from "./routes/add-mating/AddMating.component";
import MatingDetails from "./routes/mating-details/MatingDetails.component";
import Spinner from "./components/spinner/Spinner.component";

import "./index.css";
import { setSpinnerHandler } from "./store/ui/ui-action-creator";
import { auth } from "./utils/firebase-details";
import { useLayoutEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showFullBodySpinner, deleteDialogBox } = useSelector(
    (state) => state.UI
  );

  useEffect(() => {
    console.log(auth.currentUser);
    console.log("asdf checking for dialog box state");
    deleteDialogBox && (document.body.style.overflow = "hidden");
    !deleteDialogBox && (document.body.style.overflow = "auto");
    // document.body.style.overflow = deleteDialogBox ?  : "auto";
  }, [deleteDialogBox]);

  useEffect(() => {
    // dispatch(setSpinnerHandler(true));
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
      {!showFullBodySpinner && <Navigation />}
      <div className="body">
        <div className="container">
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/animals" element={<Dashboard />}></Route>
              <Route exact path="/animals/add" element={<AddAnimal />}></Route>
              <Route exact path="/animals/edit" element={<AddAnimal />}></Route>
              <Route
                exact
                path="/animals/:animalId"
                element={<Animal />}
              ></Route>
              <Route exact path="/milk" element={<Milk />}></Route>
              <Route exact path="/milk/add" element={<AddMilk />}></Route>
              <Route exact path="/milk/edit" element={<AddMilk />}></Route>
              <Route exact path="/health" element={<Health />}></Route>
              <Route exact path="/health/add" element={<AddHealth />}></Route>
              <Route exact path="/health/edit" element={<AddHealth />}></Route>
              <Route exact path="/workers" element={<Worker />}></Route>
              <Route exact path="/workers/add" element={<AddWorker />}></Route>
              <Route exact path="/workers/edit" element={<AddWorker />}></Route>
              <Route
                exact
                path="/workers/:workerId"
                element={<WorkerItem />}
              ></Route>
              <Route
                exact
                path="/transactions"
                element={<Transaction />}
              ></Route>
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
              <Route exact path="/mating" element={<Mating />}></Route>
              <Route exact path="/mating/add" element={<AddMating />}></Route>
              <Route exact path="/mating/edit" element={<AddMating />}></Route>
              <Route
                exact
                path="/mating/:matingId"
                element={<MatingDetails />}
              ></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
