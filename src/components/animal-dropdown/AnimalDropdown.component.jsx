import React from "react";
import { useSelector } from "react-redux";

import Dropdown from "../dropdown/Dropdown.component";

const AnimalDropdown = ({
  label,
  id,
  placeholder,
  name,
  onChangeHandler,
  inputValue,
  dropdownError,
  required,
}) => {
  const { allAnimals } = useSelector((state) => state.animals);
  return (
    <Dropdown
      id={id}
      label={label}
      name={name}
      placeholder={placeholder}
      onChangeHandler={onChangeHandler}
      inputValue={inputValue}
      dropdownError={dropdownError}
      required={required}
      children={allAnimals.map((d) => {
        const { id: animalId, identifier } = d;
        return (
          <option key={animalId} value={animalId}>
            {animalId} {identifier}
          </option>
        );
      })}
    />
  );
};

export default AnimalDropdown;
