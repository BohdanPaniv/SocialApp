import {
  SAVE_IMAGE_ERROR,
  IMAGE_SAVED,
  USER_POST_ADDED,
  CREATION_POST_ERROR,
  CLEAR_RESPONSE,
  FEED_ADDED,
  POST_LIKED,
  POST_UNLIKED,
  LIKE_POST_ERROR,
  UNLIKE_POST_ERROR
} from "./types";
import axios from "../../utils/API";
import { returnResponse } from "./responseActions";

export const createPost = (post) => {
  return async(dispatch) => {
    let imageName = null;
    
    if (post.image) {
      const formData = new FormData();
      formData.append("file", post.image);

      await axios
      .post("file/upload", formData)
      .then(res => {
        dispatch({
          type: IMAGE_SAVED
        });

        imageName = res.data.filename;
      })
      .catch(err => {
        dispatch({
          type: SAVE_IMAGE_ERROR
        });
      });
    }

    post.image = imageName;

    await axios
    .post("posts/createPost", post)
    .then(res => {
      dispatch({
        type: USER_POST_ADDED,
        payload: res.data.post
      });
      
      dispatch({
        type: FEED_ADDED,
        payload: res.data.post
      });

      dispatch(
        returnResponse(res.data, res.status, USER_POST_ADDED)
      );
    })
    .catch(err => {
      dispatch({
        type: CREATION_POST_ERROR
      });

      dispatch(
        returnResponse(err.response.data, err.response.status, CREATION_POST_ERROR)
      );
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
}

export const addLike = (data) => {
  return async(dispatch) => {
    await axios
    .post("posts/addLike", data)
    .then(res => {
      dispatch({
        type: POST_LIKED
      });
    })
    .catch(error => {
      dispatch({
        type: LIKE_POST_ERROR
      });
    });
  }
}

export const subtractLike = (data) => {
  return async(dispatch) => {
    await axios
    .post("posts/subtractLike", data)
    .then(res => {
      dispatch({
        type: POST_UNLIKED
      });
    })
    .catch(error => {
      dispatch({
        type: UNLIKE_POST_ERROR
      });
    });
  }
}