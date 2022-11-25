import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getWorkerData,
  setWorkerData,
} from "../../store/worker/worker-action-creator";

import Worker from "../../components/worker/Worker.component";

import "./Workers.styles.scss";

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

  return (
    <div>
      <Link
        state={{ page: "addWorker", workerId: null }}
        className="btn btn-link"
        to="/workers/add"
      >
        Add New Worker
      </Link>

      {workers && (
        <div className="workers">
          {workers.map((worker) => (
            <Worker key={worker.id} worker={worker} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Workers;
