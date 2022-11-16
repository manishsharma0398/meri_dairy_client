import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAnimalDetails,
  getAllAnimals,
} from "../../store/animal/animal-action-creator";

import DashboardItem from "../../components/dashboard-item/DashboardItem.component";

import "./dashboard.styles.scss";
import { Link } from "react-router-dom";
import DialogBox from "../../components/dialog-box/DialogBox.component";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState(null);
  const { allAnimals } = useSelector((state) => state.animals);
  const { showDeleteDialogBox } = useSelector((state) => state.UI);

  const getAllAnimalDetails = async () => {
    console.log("Refreshing");
    const animalData = await getAllAnimals();
    const { data, error } = animalData;

    if (error) return setErr(error);

    setErr(null);
    dispatch(setAnimalDetails(data));
  };

  useEffect(() => {
    getAllAnimalDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(allAnimals);
  return (
    <div className="s">
      {showDeleteDialogBox && <DialogBox />}
      {!allAnimals && !err && <h2>Loading...</h2>}
      {allAnimals && allAnimals.length === 0 && (
        <h2>No Animals added. Please add one</h2>
      )}
      {!err && (
        <Link className="btn btn-link" to="/animals/add">
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
