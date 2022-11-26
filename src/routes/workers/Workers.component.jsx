import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Worker from "../../components/worker/Worker.component";

const Workers = () => {
  const { workers } = useSelector((state) => state.worker);

  // const getWorkers = async () => {
  //   const { error, data } = await getWorkerData();
  //   if (error) return;
  //   dispatch(setWorkerData(data));
  // };

  return (
    <Fragment>
      <Link
        state={{ page: "addWorker", workerId: null }}
        className="btn btn-link"
        to="/workers/add"
      >
        Add New Worker
      </Link>

      {workers && (
        <div className="content">
          {workers.map((worker) => (
            <Worker key={worker.id} worker={worker} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Workers;
