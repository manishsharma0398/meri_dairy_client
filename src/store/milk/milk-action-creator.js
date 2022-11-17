import { SET_MILK } from "./milk-action-types";
import axios from "axios";

export const setMilkData = (milkData) => ({
  type: SET_MILK,
  payload: milkData,
});

export const addMilkData = async (milkDetails) => {
  try {
    console.log("getting milk data from server");
    const res = await axios.post("/milk/add", milkDetails);
    console.log(res);
    return { error: false, message: "Milk Record Added Successfully" };
  } catch (err) {
    console.log(err);
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
    console.log(res);
    return { error: false, data: res.data };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};

export const deleteMilkData = async (id) => {
  try {
    const res = await axios.delete(`/milk/${id}`);
    console.log(res);
    return { error: false, data: res.data };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.response.data.message };
  }
};
