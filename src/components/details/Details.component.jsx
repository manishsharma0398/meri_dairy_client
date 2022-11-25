import React from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./Details.styles.scss";

const Details = ({
  image,
  name,
  editLink,
  editLinkState,
  deleteFunction,
  details,
}) => {
  return (
    <div className="details-container">
      <div className="details">
        <div className="profile-photo-container">
          <img src={image} alt={name} />
        </div>
        <div className="profile-container">
          <div className="actions">
            <Link className="edit-action" state={editLinkState} to={editLink}>
              <span className="icon">
                <FiEdit3 className="edit" />
              </span>{" "}
              Edit
            </Link>
            <button onClick={deleteFunction} className="delete-action">
              <span className="icon">
                <FiTrash2 className="delete" />
              </span>
              Delete
            </button>
          </div>
          <div className="profile-details">{details}</div>
        </div>
      </div>
      <div className="more-details">
        <h2>Other Details</h2>
      </div>
    </div>
  );
};

export default Details;
