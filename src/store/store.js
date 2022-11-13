import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./root-reducer";

export const store = createStore(rootReducer, composeWithDevTools());
