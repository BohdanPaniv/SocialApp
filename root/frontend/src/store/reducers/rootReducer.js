import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userPostsReducer from "./userPostsReducer";
import responseReducer from "./responseReducer";
import feedReducer from "./feedReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  response: responseReducer,
  userPosts: userPostsReducer,
  feed: feedReducer
});