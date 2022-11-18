import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { parseDate } from "../../utils/dateParser";
import { addWorkerData } from "../../store/worker/worker-action-creator";

import Button from "../../components/button/Button.component";
import InputForm from "../../components/input-form/InputForm.component";

const AddWorker = () => {
  const { page, workerId } = useLocation().state;
  const navigate = useNavigate();
  const { workers } = useSelector((state) => state.worker);
  const [workerDetails, setWorkerDetails] = useState({
    name: "",
    email: "",
    address: "",
    profile_pic: "",
    date_joined: "",
    salary: "",
    remarks: "",
  });
  const [error, setError] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });

  const { name, email, address, date_joined, salary, remarks } = workerDetails;

  const fillWorkersFields = () => {
    const d = workers.filter((a) => a.id === workerId)[0];
    console.log(d);
    if (d.profile_pic.length > 0) {
      setImage({
        preview: d.profile_pic,
        raw: d.profile_pic,
      });
    }
    setWorkerDetails(
      { ...d, date_joined: parseDate(d.date_joined) },
      console.log(workerDetails)
    );
  };

  useEffect(() => {
    if (page === "editWorker") fillWorkersFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setWorkerDetails({ ...workerDetails, [e.target.name]: e.target.value });
  };

  const onFileChange = async (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const uploadPhoto = async () => {
    if (!image.raw && !image.preview) {
      console.log("photo not selected");
      return { error: false, data: "" };
    }
    try {
      const formData = new FormData();
      formData.append("photo_url", image.raw);
      const res = await axios.post("/file", formData);
      return { error: false, data: res.data.data };
    } catch (err) {
      console.log(err);
      return { error: true, data: "" };
    }
  };

  const addNewWorkerHandler = async (e) => {
    e.preventDefault();
    const { error, data } = await uploadPhoto();
    if (error) return;
    workerDetails.profile_pic = data;
    const workerAdded = await addWorkerData(workerDetails);
    const err = workerAdded.error;
    if (err) return;
    return navigate("/workers");
  };

  const updateWorkerHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth">
      <h2 className="auth-title">
        {page === "addWorker" ? "Add Worker" : "Update Worker Data"}
      </h2>
      <form
        className="auth-form"
        onSubmit={
          page === "addWorker" ? addNewWorkerHandler : updateWorkerHandler
        }
      >
        {error && <span className="err-msg">{setError}</span>}

        <InputForm
          id="name"
          label="Name"
          name="name"
          inputValue={name}
          onChangeHandler={onChangeHandler}
          placeholder="Worker Name"
        />
        <InputForm
          id="email"
          label="Email"
          name="email"
          inputValue={email}
          onChangeHandler={onChangeHandler}
          placeholder="Email"
        />

        <InputForm
          id="date_joined"
          label="Date Joined"
          name="date_joined"
          inputValue={date_joined}
          onChangeHandler={onChangeHandler}
          placeholder="Date Joined"
          type="date"
        />
        <InputForm
          id="address"
          label="Address"
          name="address"
          inputValue={address}
          onChangeHandler={onChangeHandler}
          placeholder="Address"
        />
        <InputForm
          id="salary"
          label="Salary"
          name="salary"
          inputValue={salary}
          onChangeHandler={onChangeHandler}
          placeholder="Salary"
          type="number"
        />
        <InputForm
          id="remarks"
          label="Remarks"
          name="remarks"
          inputValue={remarks}
          onChangeHandler={onChangeHandler}
          placeholder="Remarks"
        />

        <div className="img-container">
          <div className="img-preview">
            {image.raw || image.preview ? (
              <img width="100%" src={image.preview} alt="" />
            ) : (
              <h1>No Image Selected</h1>
            )}
          </div>

          <div className="img-actions">
            <button type="button" className="select">
              <label htmlFor="imgFile">Select Image</label>
              <input type="file" id="imgFile" onChange={onFileChange} />
            </button>
            <button
              className="clear"
              onClick={() => setImage({ preview: "", raw: "" })}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>

        <Button
          text={page === "addWorker" ? "Add Worker" : "Update Worker Data"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddWorker;
