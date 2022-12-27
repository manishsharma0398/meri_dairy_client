import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteWorkerData,
  setWorkerData,
} from "../../store/worker/worker-action-creator";

import Details from "../../components/details/Details.component";

const WorkerItem = () => {
  const [workerDetails, setWorkerDetails] = useState({});
  const { workerId } = useParams();
  const { workers } = useSelector((state) => state.worker);

  const dispatch = useDispatch();

  const getWorkerDetails = () => {
    const worker = workers.filter(
      (worker) => worker.id.toString() === workerId
    )[0];
    setWorkerDetails(worker);
    console.log(worker);
  };

  const deleteWorkerHandler = async () => {
    const { error } = await deleteWorkerData(id);
    if (error) return;
    const updWorkersRecords = workers.filter((m) => m.id !== id);
    dispatch(setWorkerData(updWorkersRecords));
  };

  useEffect(() => {
    getWorkerDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    id,
    name,
    email,
    address,
    profile_pic,
    date_joined,
    salary,
    remarks,
  } = workerDetails;

  return (
    <Details
      image={profile_pic}
      name={name}
      editLink={`/workers/edit`}
      editLinkState={{ page: "editWorker", workerId: id }}
      deleteFunction={deleteWorkerHandler}
      details={
        <Fragment>
          <h2>{name}</h2>
          <h2>Email: {email}</h2>
          <h2>Address: {address}</h2>
          <h2>Joined on {moment(date_joined).format("dddd Do MMMM YYYY")}</h2>
          <h2>Salary: ₹ {salary}</h2>
          <h2>Remarks: {remarks}</h2>
        </Fragment>
      }
    />
  );
};

export default WorkerItem;
