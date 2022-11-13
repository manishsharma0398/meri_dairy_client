import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAnimalDetails } from "../../store/animal/animal-action-creator";

import "./dashboard.styles.scss";

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
    <div>
      Dashboard
      {!allAnimals && <h2>No Animals added. Please add one</h2>}
    </div>
  );
};

export default Dashboard;
