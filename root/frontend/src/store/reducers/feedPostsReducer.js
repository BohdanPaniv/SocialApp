import {
  GET_FEED_LOADED,
  GET_FEED_LOADING,
  FEED_POST_ADDED,
  GET_FEED_ERROR,
  FEED_POST_LIKED,
  FEED_POST_UNLIKED,
  FEED_COMMENT_ADDED,
  LOGOUT_SUCCESS
} from "../actions/types";

const initialState = {
  feed: [],
  isLoading: false
};

export default function feedReducer(state = initialState, action){
  switch (action.type) {
    case GET_FEED_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_FEED_LOADED:
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
      return {
        ...state,
        isLoading: false,
        feed: null
      }
    case FEED_COMMENT_ADDED:
    case FEED_POST_LIKED:
    case FEED_POST_UNLIKED:
      let feed = [...state.feed];
      
      feed = feed.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }

        return post;
      });

      return {
        ...state,
        feed: feed
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        feed: []
      };
    default:
      return state;
  }
}