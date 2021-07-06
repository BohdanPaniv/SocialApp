import {
  GET_POSTS_LOADING,
  GET_POSTS_LOADED,
  CREATION_POST_ERROR,
  PROFILE_POST_ADDED,
  PROFILE_POST_LIKED,
  PROFILE_POST_UNLIKED,
  UNLIKE_POST_ERROR,
  LIKE_POST_ERROR,
  LOGOUT_SUCCESS
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
    case CREATION_POST_ERROR:
      return {
        ...state
      };
    case PROFILE_POST_ADDED:
    case PROFILE_POST_LIKED:
    case PROFILE_POST_UNLIKED:
      let profilePosts = [...state.posts];
      
      profilePosts = profilePosts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }

        return post;
      });

      return {
        ...state,
        posts: profilePosts
      }
    case UNLIKE_POST_ERROR:
    case LIKE_POST_ERROR:
      return {
        ...state
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        posts: []
      };
    default:
      return state;
  }
}