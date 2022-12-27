import { useDispatch } from "react-redux";

const getAllAnimalDetails = async () => {
  const animalData = await getAllAnimals();
  const { data, error } = animalData;

  if (error) return setErr(error);

  // setErr(null);
  // dispatch(setAnimalDetails(data));
  return data;
};

const getAllMilkRecords = async () => {
  const animalData = await getMilkData();
  const { data, error } = animalData;
  if (error) return setErr(error);
  // setErr(null);
  // dispatch(setMilkData(data));
  return data;
};

const health = async () => {
  const { error, data } = await getHealthData();
  if (error) return;
  // dispatch(setHealthData(data));
  return data;
};

const getWorkers = async () => {
  const { error, data } = await getWorkerData();
  if (error) return;
  // dispatch(setWorkerData(data));
  return data;
};

const getTransactions = async () => {
  const { error, data } = await getTransactionData();
  if (error) return;
  // dispatch(setTransactionData(data));
  return data;
};

const getTreatment = async () => {
  const { error, data } = await getTreatmentData();
  if (error) return;
  // dispatch(setTreatmentData(data));
  return data;
};

const fetchMatingData = async () => {
  const { error, data } = await getMatingData();
  if (error) return;
  // dispatch(setMatingData(data));
  return data;
};

const fetchAllData = async () => {
  const animalsPromise = getAllAnimalDetails();
  const milkRecordsPromise = getAllMilkRecords();
  const healthRecordsPromise = health();
  const workersPromise = getWorkers();
  const transactionsPromise = getTransactions();
  const treatmentRecordsPromise = getTreatment();
  const matingDataPromise = fetchMatingData();

  const [
    animals,
    milkRecords,
    healthRecords,
    workers,
    transactions,
    treatmentRecords,
    matingRecords,
  ] = await Promise.all([
    animalsPromise,
    milkRecordsPromise,
    healthRecordsPromise,
    workersPromise,
    transactionsPromise,
    treatmentRecordsPromise,
    matingDataPromise,
  ]);

  dispatch(setAnimalDetails(animals));
  dispatch(setMilkData(milkRecords));
  dispatch(setHealthData(healthRecords));
  dispatch(setWorkerData(workers));
  dispatch(setTransactionData(transactions));
  dispatch(setTreatmentData(treatmentRecords));
  dispatch(setMatingData(matingRecords));
  console.log("hello");
  console.log("out from here");
};

export const useErrorDispatcher = () => {
  const dispatch = useDispatch();

  return (payload) => {
    dispatch({ type: "SET_ERRORS", payload });
    setTimeout(() => dispatch({ type: "CLEAR_ERRORS" }), 2500);
  };
};
