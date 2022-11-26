import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getHealthData } from "../../store/health/health-action-creator";

import DialogBox from "../../components/dialog-box/DialogBox.component";
import HealthItem from "../../components/health-item/HealthItem.component";

const Health = () => {
  const { healthRecords } = useSelector((state) => state.health);
  const { deleteDialogBox } = useSelector((state) => state.UI);

  return (
    <div className="content">
      <Fragment>
        {deleteDialogBox && <DialogBox />}
        {!healthRecords && <h2>Loading...</h2>}
        {healthRecords && healthRecords.length === 0 && (
          <h2>No Records. Please add</h2>
        )}
        {/* {!err && ( */}
        <Link
          state={{ page: "addHealth", healthId: null }}
          className="btn btn-link"
          to="/health/add"
        >
          Add New Health
        </Link>
        {/* )} */}
        {/* {err && ( */}
        {!healthRecords && (
          <div>
            <h2 className="err-msg">Something went wrong. Please try again</h2>
            <Link onClick={getHealthData} className="btn btn-link">
              Refresh Page
            </Link>
          </div>
        )}
      </Fragment>

      {healthRecords && healthRecords.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Animal Name</th>
              <th>Type</th>
              <th>Medicine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((health) => (
              <HealthItem key={health.id} health={health} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Health;
