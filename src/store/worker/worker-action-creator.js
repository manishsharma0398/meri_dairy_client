import axios from "axios";

import { SET_WORKER_RECORDS } from "./worker-action-types";

export const setWorkerData = (workerData) => ({
  type: SET_WORKER_RECORDS,
  payload: workerData,
});

export const addWorkerData = async (workerDetails) => {
  try {
    await axios.post("/worker/add", workerDetails);
    return { error: false, message: "Worker Record Added Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const updateWorkerData = async (workerDetails, workerId) => {
  try {
    const res = await axios.put(`/worker/${workerId}`, workerDetails);
    console.log(res);
    return { error: false, message: "Worker Record Updated" };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const getWorkerData = async () => {
  try {
    const res = await axios.get("/worker/all");
    return { error: false, data: res.data };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteWorkerData = async (id) => {
  try {
    await axios.delete(`/worker/${id}`);
    return { error: false, message: "Worker Deleted Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};
