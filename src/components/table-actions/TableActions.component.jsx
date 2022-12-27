import React, { Fragment } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setDeleteDialogBoxDisplay } from "../../store/ui/ui-action-creator";

const TableActions = ({
  deleteHandler,
  editLinkState,
  editLink,
  previewLink,
}) => {
  const dispatch = useDispatch();

  const deleteItemHandler = () => {
    dispatch(setDeleteDialogBoxDisplay(true));
    deleteHandler();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        // paddingTop: "6px",
        gap: "10px",
        padding: "6px 4px 0 4px",
      }}
      className="actions"
    >
      {previewLink && (
        <Link to={previewLink}>
          <FaRegEye className="act" style={{ color: "blue" }} />
        </Link>
      )}
      <Link state={editLinkState} to={editLink}>
        <FiEdit3 className="act" style={{ color: "blue" }} />
        {/* Edit */}
      </Link>
      <Link to="#" onClick={deleteItemHandler}>
        <FiTrash2 className="act" style={{ color: "red" }} />
        {/* Delete */}
      </Link>
    </div>
  );
};

export default TableActions;
