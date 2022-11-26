import React from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDeleteDialogBoxDisplay } from "../../store/ui/ui-action-creator";

const TableActions = ({ deleteHandler, editLinkState, editLink }) => {
  const dispatch = useDispatch();

  const deleteItemHandler = () => {
    dispatch(setDeleteDialogBoxDisplay(true));
    deleteHandler();
  };

  return (
    <div className="actions">
      <Link state={editLinkState} to={editLink}>
        <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
      </Link>
      <FiTrash2
        onClick={deleteItemHandler}
        className="act"
        style={{ color: "red" }}
      />
    </div>
  );
};

export default TableActions;
