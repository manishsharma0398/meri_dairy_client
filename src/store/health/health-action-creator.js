import { SET_HEALTH_RECORDS } from "./health-action-types";
import axios from "axios";

export const setHealthData = (healthData) => ({
  type: SET_HEALTH_RECORDS,
  payload: healthData,
});

export const addHealthData = async (healthDetails) => {
  try {
    await axios.post("/health/add", healthDetails);
    return { error: false, message: "Health Added" };
  } catch (err) {
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
    return { error: false, data: res.data };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteHealthData = async (id) => {
  try {
    await axios.delete(`/health/${id}`);
    return { error: false, message: "Health Deleted Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};
