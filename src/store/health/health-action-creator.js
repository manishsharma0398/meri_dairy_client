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
  try {
    await axios.put(`/health/${healthId}`, healthDetails);
    return { error: false, message: "Health Record Updated Successfully" };
  } catch (err) {
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
