import {
  GET_POSTS_LOADING,
  GET_POSTS_LOADED,
  CREATION_POST_ERROR,
  USER_POST_ADDED,
  POST_LIKED,
  POST_UNLIKED,
  UNLIKE_POST_ERROR,
  LIKE_POST_ERROR
} from "../actions/types";

const initialState = {
  posts: [],
  isLoading: false
};

export default function userPostsReducer(state = initialState, action){
  switch (action.type) {
    case GET_POSTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTS_LOADED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case USER_POST_ADDED:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case CREATION_POST_ERROR:
      return {
        ...state
      };
    case POST_LIKED:
    case POST_UNLIKED:
    case UNLIKE_POST_ERROR:
    case LIKE_POST_ERROR:
      return{
        ...state
      };
    default:
      return state;
  }
}