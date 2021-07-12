import axios from "../../utils/API";
import {
  GET_FEED_LOADED,
  GET_FEED_LOADING,
  GET_FEED_ERROR,
  GET_FILTERED_FEED,
  FILTERING_FEED_ERROR
} from "./types";

export const getFeed = (data) => {
  return async(dispatch) => {
    dispatch({
      type: GET_FEED_LOADING
    });

    await axios.post("posts/getFeed", data).then(res => {
      dispatch({
        type: GET_FEED_LOADED,
        payload: res.data.posts.sort((a, b) => b.createdAt - a.createdAt)
      });
    })
    .catch(err => {
      dispatch({
        type: GET_FEED_ERROR
      });
    });
  };
};

export const searchForFeed = (data) => {
  return async(dispatch) => {
    await axios.post("posts/getFeed", data).then(res => {
      dispatch({
        type: GET_FILTERED_FEED,
        payload: res.data.posts.sort((a, b) => b.createdAt - a.createdAt)
      });
    })
    .catch(err => {
      dispatch({
        type: FILTERING_FEED_ERROR
      });
    });
  };
};