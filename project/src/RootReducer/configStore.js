import { combineReducers,createStore } from "redux";
import { QuanLyHSReducer } from "./QuanLyHSReducer";

const rootReducer = combineReducers({
    QuanLyHSReducer
});
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
