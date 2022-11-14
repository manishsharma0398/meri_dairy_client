import React from "react";
import { Link } from "react-router-dom";

import "./DashboardItem.styles.scss";

const DashboardItem = ({ animal }) => {
  const { photo_url, remarks, tag_no } = animal;
  return (
    <div className="card">
      <img src={photo_url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-body-title">
          <Link to={`/animals/${tag_no}`}>{tag_no}</Link>
        </h5>
        <p className="card-body-text">{remarks}</p>
      </div>
    </div>
  );
};

export default DashboardItem;
