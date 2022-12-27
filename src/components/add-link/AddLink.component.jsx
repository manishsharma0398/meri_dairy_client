import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import "./AddLink.styles.scss";

const AddLink = ({ addLink, addLinkState, linkText }) => {
  return (
    <Link state={addLinkState} className="btn btn-link" to={addLink}>
      <span>
        <IoMdAdd />
      </span>{" "}
      {linkText}
    </Link>
  );
};

export default AddLink;
