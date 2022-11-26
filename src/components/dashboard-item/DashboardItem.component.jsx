import React from "react";

import { placeholderImg } from "../../utils/placeholderImage";

import PreviewItem from "../preview-item/PreviewItem.component";

const DashboardItem = ({ animal }) => {
  const { photo_url, id, identifier } = animal;

  return (
    <PreviewItem
      id={id}
      image={photo_url ? photo_url : placeholderImg(identifier[0])}
      detailsLink={`/animals/${id}`}
      name={identifier}
      editLinkState={{ page: "editAnimal", animalId: id }}
      editLink="/animals/edit"
      tableToDeleteFrom="animal"
    />
  );
};

export default DashboardItem;
