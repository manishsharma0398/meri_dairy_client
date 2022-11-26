import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GrMoreVertical } from "react-icons/gr";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";

import {
  setDeleteDialogBoxDisplay,
  setDeleteDialogBoxData,
} from "../../store/ui/ui-action-creator";

import "./PreviewInput.styles.scss";

const PreviewItem = ({
  id,
  image,
  name,
  detailsLink,
  tableToDeleteFrom,
  editLink,
  editLinkState,
}) => {
  const [displayOptBox, setDisplayOptBox] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(setDeleteDialogBoxData({ table: tableToDeleteFrom, id }));
    dispatch(setDeleteDialogBoxDisplay(true));
    setDisplayOptBox(!displayOptBox);
  };

  const toggleDisplayOptBox = (e) => {
    setDisplayOptBox(!displayOptBox);
  };

  return (
    <div className="preview">
      <img src={image} className="preview-img" alt={name} />
      <div className="bg-dark"></div>
      <button className="more-options" onClick={toggleDisplayOptBox}>
        <GrMoreVertical className="more" />
      </button>
      {displayOptBox && (
        <div className="opt-box">
          <Link
            onClick={console.log("preview item edit clicked")}
            className="opt-box-container-options"
            state={editLinkState}
            to={editLink}
          >
            <span className="icon">
              <FiEdit3 className="edit" />
            </span>{" "}
            Edit
          </Link>
          <button onClick={deleteHandler} className="opt-box-container-options">
            <span className="icon">
              <FiTrash2 className="delete" />
            </span>
            Delete
          </button>
        </div>
      )}
      <Link className="preview-link label" to={detailsLink}>
        {name}
      </Link>
    </div>
  );
};

export default PreviewItem;
