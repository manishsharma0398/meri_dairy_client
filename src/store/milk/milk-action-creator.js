import { SET_MILK } from "./milk-action-types";
import axios from "axios";

export const setMilkData = (milkData) => ({
  type: SET_MILK,
  payload: milkData,
});

export const addMilkData = async (milkDetails) => {
  try {
    await axios.post("/milk/add", milkDetails);
    return { error: false, message: "Milk Record Added Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const updateMilkData = async (milkDetails, milkId) => {
  const { animal, time, date, quantity } = milkDetails;
  const dataToSend = { animal, time, date, quantity };
  console.log(milkDetails, milkId);
  try {
    console.log("updating milk data from server");
    const res = await axios.put(`/milk/${milkId}`, dataToSend);
    console.log(res);
    return { error: false, message: "Milk Record Updated Successfully" };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const getMilkData = async () => {
  try {
    const res = await axios.get("/milk/all");
    return { error: false, data: res.data };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteMilkData = async (id) => {
  try {
    await axios.delete(`/milk/${id}`);
    return { error: false, message: "Milk Record Deleted" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};
