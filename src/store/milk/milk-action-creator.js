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
    return { ...err.response, error: true };
  }
};

export const updateMilkData = async (milkDetails, milkId) => {
  try {
    await axios.put(`/milk/${milkId}`, milkDetails);
    return { error: false, message: "Updated Successfully" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const getMilkData = async () => {
  try {
    const res = await axios.get("/milk/all");
    return { error: false, data: res.data };
  } catch (err) {
    return { ...err.response, error: true };
  }
};

export const deleteMilkData = async (id) => {
  try {
    await axios.delete(`/milk/${id}`);
    return { error: false, message: "Milk Record Deleted" };
  } catch (err) {
    return { ...err.response, error: true };
  }
};
