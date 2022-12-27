const updateState = ({ state, data }) => {
  const updatedAuthErrors = { ...state };
  data.map((err) => {
    const fieldName = Object.keys(err)[0];
    const errorMessage = err[fieldName];
    return (updatedAuthErrors[fieldName] = errorMessage);
  });
  return updatedAuthErrors;
};

export default updateState;
