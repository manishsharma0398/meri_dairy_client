import axios from "axios";
import { SET_MATING_DATA } from "./mating-action-types";

export const setMatingData = (matingData) => ({
  type: SET_MATING_DATA,
  payload: matingData,
});

export const addMatingData = async (matingDetails) => {
  try {
    await axios.post("/mating/add", matingDetails);
    return { error: false, message: "Mating Record Added Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const updateMatingData = async (matingDetails, matingId) => {
  try {
    console.log("updating Mating data from server");
    const res = await axios.put(`/mating/${matingId}`, matingDetails);
    console.log(res);
    return { error: false, message: "Mating Record Updated Successfully" };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const getMatingData = async () => {
  try {
    const res = await axios.get("/mating/all");
    return { error: false, data: res.data };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteMatingData = async (id) => {
  try {
    await axios.delete(`/mating/${id}`);
    return { error: false, message: "Mating Record Deleted" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};
