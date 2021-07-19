import {
  CREATION_POST_ERROR,
  PROFILE_POST_ADDED,
  PROFILE_POST_LIKED,
  PROFILE_POST_UNLIKED,
  UNLIKE_POST_ERROR,
  LIKE_POST_ERROR,
  LOGOUT_SUCCESS,
  GET_PROFILE_POSTS_LOADING,
  GET_PROFILE_POSTS_LOADED,
  PROFILE_COMMENT_ADDED,
  GET_FILTERED_PROFILE_POSTS,
  GET_PROFILE_POSTS_ERROR,
  FILTERING_PROFILE_POSTS_ERROR,
  PROFILE_COMMENTS_RECEIVED,
  GET_PROFILE_COMMENTS_ERROR
} from "../actions/types";

const initialState = {
  posts: [],
  isLoading: false
};

export default function profilePostsReducer(state = initialState, action){
  let profilePosts = [...state.posts];

  switch (action.type) {
    case GET_PROFILE_POSTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROFILE_POSTS_LOADED:
    case GET_FILTERED_PROFILE_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false
      };
    case CREATION_POST_ERROR:
      return {
        ...state
      };
    case PROFILE_POST_ADDED:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case PROFILE_COMMENT_ADDED:
      profilePosts.forEach(post => {
        if (post._id === action.payload.postId) {
          return post.comments.push(action.payload.comment);
        }

        return post;
      });

      return {
        ...state,
        posts: profilePosts
      }
    case PROFILE_COMMENTS_RECEIVED:
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
    case PROFILE_POST_LIKED:
      profilePosts.forEach(post => {
        if (post._id === action.payload.postId) {
          return post.likes.push(action.payload.likes);
        }
      });

      return {
        ...state,
        posts: profilePosts
      };
    case PROFILE_POST_UNLIKED:
      profilePosts.forEach(post => {
        if (post._id === action.payload.postId) {
          post.likes.forEach((like, index) => {
            if (like.userId === action.payload.likes.userId) {
              post.likes.splice(index, 1);
            }
          });
        }
      });

      return {
        ...state,
        posts: profilePosts
      };
    case UNLIKE_POST_ERROR:
    case LIKE_POST_ERROR:
      return {
        ...state
      };
    case GET_PROFILE_POSTS_ERROR:
    case FILTERING_PROFILE_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        posts: null
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        posts: []
      };
    case GET_PROFILE_COMMENTS_ERROR:
      return state;
    default:
      return state;
  }
}