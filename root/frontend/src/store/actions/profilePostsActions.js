import {
  FILTERING_PROFILE_POSTS_ERROR,
  GET_FILTERED_PROFILE_POSTS,
  GET_PROFILE_POSTS_ERROR, 
  GET_PROFILE_POSTS_LOADED, 
  GET_PROFILE_POSTS_LOADING
} from "./types";
import axios from "../../utils/API";

export const getProfilePosts = (data) => {
  return async(dispatch) => {
    dispatch({
      type: GET_PROFILE_POSTS_LOADING
    });

    await axios.post("posts/getProfilePosts", data).then(res => {
      dispatch({
        type: GET_PROFILE_POSTS_LOADED,
        payload: res.data.posts.sort((a, b) => b.createdAt - a.createdAt)
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE_POSTS_ERROR
      })
    });
  };
};

export const searchForProfilePosts = (data) => {
  return async(dispatch) => {
    await axios.post("posts/getProfilePosts", data).then(res => {
      dispatch({
        type: GET_FILTERED_PROFILE_POSTS,
        payload: res.data.posts
        .sort((a, b) => b.createdAt - a.createdAt)
      });
    })
    .catch(err => {
      dispatch({
        type: FILTERING_PROFILE_POSTS_ERROR
      });
    });
  };
};