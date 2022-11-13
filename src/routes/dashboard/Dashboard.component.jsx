import React, { useEffect } from "react";
import axios from "axios";

import "./dashboard.styles.scss";

const Dashboard = () => {
  useEffect(() => {
    const getAllAnimals = async () => {
      const res = await axios.get("/animals/all");
      console.log(res);
    };
    getAllAnimals();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
