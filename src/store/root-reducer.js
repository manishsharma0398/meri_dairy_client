import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";
import { animalReducer } from "./animal/animal-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  animals: animalReducer,
});
