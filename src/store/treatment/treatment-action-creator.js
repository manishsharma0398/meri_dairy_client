import { SET_TREATMENT_DATA } from "./treatment-action-types";
import axios from "axios";

export const setTreatmentData = (treatmentData) => ({
  type: SET_TREATMENT_DATA,
  payload: treatmentData,
});

export const addTreatmentData = async (treatmentDetails) => {
  try {
    await axios.post("/treatment/add", treatmentDetails);
    return { error: false, message: "Treatment Record Added Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const updateTreatmentData = async (treatmentDetails, treatmentId) => {
  try {
    await axios.put(`/treatment/${treatmentId}`, treatmentDetails);
    return { error: false, message: "Treatment Record Updated" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const getTreatmentData = async () => {
  try {
    const res = await axios.get("/treatment/all");
    return { error: false, data: res.data };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};

export const deleteTreatmentData = async (id) => {
  try {
    await axios.delete(`/treatment/${id}`);
    return { error: false, message: "Treatment Deleted Successfully" };
  } catch (err) {
    return { error: true, message: err.response.data.message };
  }
};
