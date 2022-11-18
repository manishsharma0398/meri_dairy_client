import { SET_WORKER_RECORDS } from "./worker-action-types";
import axios from "axios";

export const setWorkerData = (workerData) => ({
  type: SET_WORKER_RECORDS,
  payload: workerData,
});

export const addWorkerData = async (workerDetails) => {
  console.log(workerDetails);
  try {
    console.log("adding worker data to server");
    const res = await axios.post("/worker/add", workerDetails);
    console.log(res);
    return { error: false, message: "Worker Record Added Successfully" };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const updateWorkerData = async (workerDetails, workerId) => {
  console.log(workerDetails, workerId);
  try {
    console.log("updating health data from server");
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
    console.log(res);
    return { error: false, data: res.data };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const deleteWorkerData = async (id) => {
  try {
    const res = await axios.delete(`/worker/${id}`);
    console.log(res);
    return { error: false, data: res.data };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};
