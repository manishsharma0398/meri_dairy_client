import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";
import { animalReducer } from "./animal/animal-reducer";
import { UIReducer } from "./ui/ui-reducer";
import { milkReducer } from "./milk/milk-reducer";
import { healthReducer } from "./health/health-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  animals: animalReducer,
  UI: UIReducer,
  milk: milkReducer,
  health: healthReducer,
});
