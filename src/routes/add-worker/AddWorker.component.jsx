import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { parseDate } from "../../utils/dateParser";
import {
  addWorkerData,
  updateWorkerData,
} from "../../store/worker/worker-action-creator";
import { uploadPhoto } from "../../utils/uploadImageHandler";

import Form from "../../components/form/Form.component";
import InputForm from "../../components/input-form/InputForm.component";
import ImageUploader from "../../components/image-uploader/ImageUploader.component";

const AddWorker = () => {
  const [workerDetails, setWorkerDetails] = useState({
    name: "",
    email: "",
    address: "",
    profile_pic: "",
    date_joined: "",
    salary: "",
    remarks: "",
  });
  const [image, setImage] = useState({ preview: "", raw: "" });
  const { page, workerId } = useLocation().state;
  const navigate = useNavigate();
  const { workers } = useSelector((state) => state.worker);

  useEffect(() => {
    if (page === "editWorker") fillWorkersFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fillWorkersFields = () => {
    const worker = workers.filter((a) => a.id === workerId)[0];
    setImage({
      preview: worker.profile_pic,
      raw: worker.profile_pic,
    });
    const { id, user_id, date_joined, ...workerDetails } = worker;
    setWorkerDetails({ ...workerDetails, date_joined: parseDate(date_joined) });
  };

  const onChangeHandler = (e) => {
    setWorkerDetails({ ...workerDetails, [e.target.name]: e.target.value });
  };

  const addNewWorkerHandler = async () => {
    const { error } = await addWorkerData(workerDetails);
    if (error) return;
    return navigate("/workers");
  };

  const updateWorkerHandler = async () => {
    const { error } = await updateWorkerData(workerDetails, workerId);
    if (error) return;
    return navigate("/workers");
  };

  const onFileChange = async (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const onSelectImgClear = () => {
    setImage({ preview: "", raw: "" });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // const { error, data } = await uploadPhoto(image);
    const { data } = await uploadPhoto(image);
    workerDetails.profile_pic = data;
    if (page === "addWorker") return addNewWorkerHandler();
    return updateWorkerHandler();
  };

  const { name, email, address, date_joined, salary, remarks } = workerDetails;
  const { preview, raw } = image;

  return (
    <Form
      formHeading={`${page === "addWorker" ? "Add" : "Update"}  Worker`}
      onSubmitFormHandler={handleSubmitForm}
      btnText={`${page === "addWorker" ? "Add" : "Update"}  Worker`}
      children={
        <Fragment>
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
          <ImageUploader
            previewImage={preview}
            rawImage={raw}
            onFileChange={onFileChange}
            onSelectImgClear={onSelectImgClear}
          />
        </Fragment>
      }
    />
  );
};

export default AddWorker;
