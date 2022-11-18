import { SET_HEALTH_RECORDS } from "./health-action-types";
import axios from "axios";

export const setHealthData = (healthData) => ({
  type: SET_HEALTH_RECORDS,
  payload: healthData,
});

export const addHealthData = async (healthDetails) => {
  console.log(healthDetails);
  try {
    console.log("adding health data from server");
    const res = await axios.post("/health/add", healthDetails);
    console.log(res);
    return { error: false, message: "Milk Record Added Successfully" };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const updateHealthData = async (healthDetails, healthId) => {
  const { animal_id, treatment_type, date, medicine } = healthDetails;
  const dataToSend = { animal_id, treatment_type, date, medicine };
  console.log(healthDetails, healthId);
  try {
    console.log("updating health data from server");
    const res = await axios.put(`/health/${healthId}`, dataToSend);
    console.log(res);
    return { error: false, message: "Health Record Updated Successfully" };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const getHealthData = async () => {
  try {
    const res = await axios.get("/health/all");
    console.log(res);
    return { error: false, data: res.data };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const deleteHealthData = async (id) => {
  try {
    const res = await axios.delete(`/health/${id}`);
    console.log(res);
    return { error: false, data: res.data };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};
