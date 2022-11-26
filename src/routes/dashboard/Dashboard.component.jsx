import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getMilkData, setMilkData } from "../../store/milk/milk-action-creator";
import {
  setAnimalDetails,
  getAllAnimals,
} from "../../store/animal/animal-action-creator";
import {
  getHealthData,
  setHealthData,
} from "../../store/health/health-action-creator";
import {
  getWorkerData,
  setWorkerData,
} from "../../store/worker/worker-action-creator";
import {
  getTransactionData,
  setTransactionData,
} from "../../store/transaction/transaction-action-creator";
import {
  getTreatmentData,
  setTreatmentData,
} from "../../store/treatment/treatment-action-creator";
import {
  getMatingData,
  setMatingData,
} from "../../store/mating/mating-action-creator";
import { setSpinnerHandler } from "../../store/ui/ui-action-creator";

import DashboardItem from "../../components/dashboard-item/DashboardItem.component";
import DialogBox from "../../components/dialog-box/DialogBox.component";

import "./dashboard.styles.scss";
import Spinner from "../../components/spinner/Spinner.component";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const { allAnimals } = useSelector((state) => state.animals);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  const getAllAnimalDetails = async () => {
    const animalData = await getAllAnimals();
    const { data, error } = animalData;

    if (error) return setErr(error);

    // setErr(null);
    // dispatch(setAnimalDetails(data));
    return data;
  };

  const getAllMilkRecords = async () => {
    const animalData = await getMilkData();
    const { data, error } = animalData;
    if (error) return setErr(error);
    // setErr(null);
    // dispatch(setMilkData(data));
    return data;
  };

  const health = async () => {
    const { error, data } = await getHealthData();
    if (error) return;
    // dispatch(setHealthData(data));
    return data;
  };

  const getWorkers = async () => {
    const { error, data } = await getWorkerData();
    if (error) return;
    // dispatch(setWorkerData(data));
    return data;
  };

  const getTransactions = async () => {
    const { error, data } = await getTransactionData();
    if (error) return;
    // dispatch(setTransactionData(data));
    return data;
  };

  const getTreatment = async () => {
    const { error, data } = await getTreatmentData();
    if (error) return;
    // dispatch(setTreatmentData(data));
    return data;
  };

  const fetchMatingData = async () => {
    const { error, data } = await getMatingData();
    if (error) return;
    // dispatch(setMatingData(data));
    return data;
  };

  const fetchAllData = async () => {
    const animalsPromise = getAllAnimalDetails();
    const milkRecordsPromise = getAllMilkRecords();
    const healthRecordsPromise = health();
    const workersPromise = getWorkers();
    const transactionsPromise = getTransactions();
    const treatmentRecordsPromise = getTreatment();
    const matingDataPromise = fetchMatingData();

    const [
      animals,
      milkRecords,
      healthRecords,
      workers,
      transactions,
      treatmentRecords,
      matingRecords,
    ] = await Promise.all([
      animalsPromise,
      milkRecordsPromise,
      healthRecordsPromise,
      workersPromise,
      transactionsPromise,
      treatmentRecordsPromise,
      matingDataPromise,
    ]);

    dispatch(setAnimalDetails(animals));
    dispatch(setMilkData(milkRecords));
    dispatch(setHealthData(healthRecords));
    dispatch(setWorkerData(workers));
    dispatch(setTransactionData(transactions));
    dispatch(setTreatmentData(treatmentRecords));
    dispatch(setMatingData(matingRecords));
    console.log("hello");
    console.log("out from here");
  };

  useEffect(() => {
    console.log("here");
    fetchAllData().then(() => {
      dispatch(setSpinnerHandler(false));
    });

    console.log("here 2");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { showFullBodySpinner } = useSelector((state) => state.UI);

  return showFullBodySpinner ? (
    <Spinner />
  ) : (
    <div className="content">
      {deleteDialogBox && <DialogBox />}
      {!allAnimals && !err && <h2>Loading...</h2>}
      {allAnimals && allAnimals.length === 0 && (
        <h2>No Animals added. Please add one</h2>
      )}
      {!err && (
        <Link
          state={{ page: "addAnimal", animalId: null }}
          className="btn btn-link"
          to="/animals/add"
        >
          Add New Animal
        </Link>
      )}
      {err && (
        <div>
          <h2 className="err-msg">Something went wrong. Please try again</h2>
          <Link onClick={getAllAnimalDetails} className="btn btn-link">
            Refresh Page
          </Link>
        </div>
      )}
      {allAnimals &&
        allAnimals.map((animal) => (
          <DashboardItem key={animal.id} animal={animal} />
        ))}
    </div>
  );
};

export default Dashboard;
