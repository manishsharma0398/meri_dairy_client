import { combineReducers } from "redux";

import { userReducer } from "./user/user-reducer";
import { animalReducer } from "./animal/animal-reducer";
import { UIReducer } from "./ui/ui-reducer";
import { milkReducer } from "./milk/milk-reducer";
import { healthReducer } from "./health/health-reducer";
import { workerReducer } from "./worker/worker-reducer";
import { transactionReducer } from "./transaction/transaction-reducer";
import { treatmentReducer } from "./treatment/treatment-reducer";
import { matingReducer } from "./mating/mating-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  animals: animalReducer,
  UI: UIReducer,
  milk: milkReducer,
  health: healthReducer,
  worker: workerReducer,
  transaction: transactionReducer,
  treatment: treatmentReducer,
  mating: matingReducer,
});
