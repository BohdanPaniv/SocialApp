import { combineReducers } from "redux";
import authReducer from "./authReducer";
import responseReducer from "./responseReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  response: responseReducer
});