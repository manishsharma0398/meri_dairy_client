import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAnimalDetails } from "../../store/animal/animal-action-creator";

import "./dashboard.styles.scss";
import DashboardItem from "../../components/dashboard-item/DashboardItem.component";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allAnimals } = useSelector((state) => state.animals);

  useEffect(() => {
    const getAllAnimals = async () => {
      const res = await axios.get("/animals/all");
      console.log(res);

      dispatch(setAnimalDetails(res.data));
    };
    getAllAnimals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="s">
      {!allAnimals && <h2>No Animals added. Please add one</h2>}
      {allAnimals &&
        allAnimals.map((animal) => (
          <DashboardItem key={animal.tag_no} animal={animal} />
        ))}
    </div>
  );
};

export default Dashboard;
