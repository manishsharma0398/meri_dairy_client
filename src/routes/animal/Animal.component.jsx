import React from "react";
import { useParams } from "react-router-dom";

import "./Animal.styles.scss";

const Animal = () => {
  const params = useParams();
  console.log(params);

  return <div>Animal: {params.animalId}</div>;
};

export default Animal;
