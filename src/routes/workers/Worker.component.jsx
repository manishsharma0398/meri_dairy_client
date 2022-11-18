import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import moment from "moment";

import {
  getWorkerData,
  setWorkerData,
  deleteWorkerData,
} from "../../store/worker/worker-action-creator";

const Workers = () => {
  const dispatch = useDispatch();
  const { workers } = useSelector((state) => state.worker);

  const getWorkers = async () => {
    const { error, data } = await getWorkerData();
    if (error) return;
    dispatch(setWorkerData(data));
  };

  useEffect(() => {
    getWorkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteWorkerHandler = async (id) => {
    const { error } = await deleteWorkerData(id);
    if (error) return;
    const updWorkersRecords = workers.filter((m) => m.id !== id);
    dispatch(setWorkerData(updWorkersRecords));
  };

  return (
    <div>
      <Link
        state={{ page: "addWorker", workerId: null }}
        className="btn btn-link"
        to="/workers/add"
      >
        Add New Worker
      </Link>

      {workers &&
        workers.map((worker) => {
          const {
            id,
            name,
            email,
            address,
            profile_pic,
            date_joined,
            salary,
            remarks,
          } = worker;
          return (
            <div
              style={{
                border: "1px solid gray",
                marginBottom: "10px",
                padding: "10px",
                width: "350px",
              }}
              key={id}
            >
              <div className="actions">
                <Link
                  state={{ page: "editWorker", workerId: id }}
                  to={`/workers/edit`}
                >
                  <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
                </Link>
                <FiTrash2
                  onClick={() => deleteWorkerHandler(id)}
                  className="act"
                  style={{ color: "red" }}
                />
              </div>
              <img width="100%" src={profile_pic} alt={name} />
              <h2>{name}</h2>
              <h2>Email: {email}</h2>
              <h2>Address: {address}</h2>
              <h2>
                Joined on {moment(date_joined).format("dddd Do MMMM YYYY")}
              </h2>
              <h2>Salary: ₹ {salary}</h2>
              <h2>Remarks: {remarks}</h2>
            </div>
          );
        })}
    </div>
  );
};

export default Workers;
