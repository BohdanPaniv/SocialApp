import {
  GET_FEED_LOADED,
  GET_FEED_LOADING,
  FEED_POST_ADDED,
  GET_FEED_ERROR,
  FEED_POST_LIKED,
  FEED_POST_UNLIKED,
  FEED_COMMENT_ADDED,
  LOGOUT_SUCCESS,
  GET_FILTERED_FEED,
  FILTERING_FEED_ERROR,
  FEED_COMMENTS_RECEIVED,
  GET_FEED_COMMENTS_ERROR
} from "../actions/types";

const initialState = {
  feed: [],
  isLoading: false
};

export default function feedReducer(state = initialState, action){
  let feed = [...state.feed];

  switch (action.type) {
    case GET_FEED_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_FEED_LOADED:
    case GET_FILTERED_FEED:
      return {
        ...state,
        feed: action.payload,
        isLoading: false
      };
    case FEED_POST_ADDED:
      return {
        ...state,
        feed: [action.payload, ...state.feed]
      };
    case GET_FEED_ERROR:
    case FILTERING_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        feed: null
      }
    case FEED_POST_LIKED:
      feed.forEach(post => {
        if (post._id === action.payload.postId) {
          return post.likes.push(action.payload.likes);
        }
      });

      return {
        ...state,
        feed
      };
    case FEED_POST_UNLIKED:
      feed.forEach(post => {
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
        feed
      };
    case FEED_COMMENT_ADDED:
      feed.forEach(post => {
        if (post._id === action.payload.postId) {
          return post.comments.push(action.payload.comment);
        }

        return post;
      });

      return {
        ...state,
        feed
      }
    case FEED_COMMENTS_RECEIVED:
      feed = feed.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }

        return post;
      });

      return {
        ...state,
        feed
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        feed: []
      };
    case GET_FEED_COMMENTS_ERROR:
      return {
        state
      };
    default:
      return state;
  }
}