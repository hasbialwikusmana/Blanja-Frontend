import { combineReducers } from "redux";
import myBagReducer from "./myBag";

const rootReducer = combineReducers({
  myBag: myBagReducer,
});

export default rootReducer;
