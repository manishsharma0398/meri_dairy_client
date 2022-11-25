import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

import { placeholderImg } from "../../utils/placeholderImage";
import { showDeleteAnimalModal } from "../../store/ui/ui-action-creator";

import "./DashboardItem.styles.scss";
import { MdMoreVert } from "react-icons/md";

const DashboardItem = ({ animal }) => {
  const dispatch = useDispatch();
  const { photo_url, remarks, id, identifier, animal_type } = animal;

  const deleteAnimalHandler = async (e) => {
    e.preventDefault();
    dispatch(showDeleteAnimalModal({ display: true, id }));
  };

  return (
    <div className="card">
      <img
        src={photo_url ? photo_url : placeholderImg(animal_type)}
        className="card-img-top"
        alt="..."
      />
      <button className="more-options">
        <MdMoreVert />
      </button>
      <div className="card-body">
        <h5 className="card-body-title">
          <Link to={`/animals/${id}`}>{identifier}</Link>
          <div className="actions">
            <Link
              state={{ page: "editAnimal", animalId: id }}
              to={`/animals/edit`}
            >
              <FiEdit3 className="act" style={{ color: "blue" }} />{" "}
            </Link>
            <FiTrash2
              onClick={deleteAnimalHandler}
              className="act"
              style={{ color: "red" }}
            />
          </div>
        </h5>
        <p className="card-body-text">{remarks}</p>
      </div>
    </div>
  );
};

export default DashboardItem;
