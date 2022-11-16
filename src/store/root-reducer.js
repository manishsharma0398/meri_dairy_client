import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";
import { animalReducer } from "./animal/animal-reducer";
import { UIReducer } from "./ui/ui-reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  animals: animalReducer,
  UI: UIReducer,
});
