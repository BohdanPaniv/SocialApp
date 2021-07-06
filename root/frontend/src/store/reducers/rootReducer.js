import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profilePostsReducer from "./profilePostsReducer";
import responseReducer from "./responseReducer";
import feedReducer from "./feedPostsReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  response: responseReducer,
  profilePosts: profilePostsReducer,
  feedPosts: feedReducer
});