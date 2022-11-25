import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

export const placeholderImg = (text, height = 350, width = 400) => {
  return `https://via.placeholder.com/300.png?text=${capitalizeFirstLetter(
    text
  )}`;
  // return `https://via.placeholder.com/${height}x${width}.png?text=${capitalizeFirstLetter(
  //   text
  // )}`;
};
