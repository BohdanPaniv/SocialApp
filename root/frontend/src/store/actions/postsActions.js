import {
  SAVE_IMAGE_ERROR,
  IMAGE_SAVED,
  CREATION_POST_ERROR,
  CLEAR_RESPONSE,
  PROFILE_POST_ADDED,
  FEED_POST_ADDED,
  FEED_POST_UNLIKED,
  LIKE_POST_ERROR,
  UNLIKE_POST_ERROR,
  PROFILE_POST_LIKED,
  FEED_POST_LIKED,
  PROFILE_POST_UNLIKED,
  ADD_COMMENT_ERROR,
  FEED_COMMENT_ADDED,
  PROFILE_COMMENT_ADDED,
} from "./types";
import axios from "../../utils/API";
import { returnResponse } from "./responseActions";

export const createPost = ({ post, isHome }) => {
  return async(dispatch) => {
    let imageName = null;

    if (post.imageName) {
      const formData = new FormData();
      formData.append("file", post.imageName);

      await axios.post("file/upload", formData).then(res => {
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

    post.imageName = imageName;

    await axios.post("posts/createPost", post).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_POST_ADDED,
          payload: res.data.post
        });
        dispatch(
          returnResponse(res.data, res.status, FEED_POST_ADDED)
        );
        return;
      }

      dispatch({
        type: PROFILE_POST_ADDED,
        payload: res.data.post
      });
      dispatch(
        returnResponse(res.data, res.status, PROFILE_POST_ADDED)
      );
    })
    .catch(err => {
      dispatch({
        type: CREATION_POST_ERROR
      });
      dispatch(
        returnResponse(err.response?.data, err.response?.status, CREATION_POST_ERROR)
      );
    });

    dispatch({
      type: CLEAR_RESPONSE
    });
  };
};

export const addLike = ({ user, post, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/addLike", { user, post }).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_POST_LIKED,
          payload: res.data.post
        });
        return;
      }

      dispatch({
        type: PROFILE_POST_LIKED,
        payload: res.data.post
      });
    })
    .catch(error => {
      dispatch({
        type: LIKE_POST_ERROR
      });
    });
  };
};

export const removeLike = ({ user, post, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/removeLike", { user, post}).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_POST_UNLIKED,
          payload: res.data.post
        });
        return;
      }

      dispatch({
        type: PROFILE_POST_UNLIKED,
        payload: res.data.post
      });
    })
    .catch(error => {
      dispatch({
        type: UNLIKE_POST_ERROR
      });
    });
  };
};

export const addComment = ({ userComment, postId, isHome }) => {
  return async(dispatch) => {
    await axios.post("posts/addComment", { userComment, postId }).then(res => {
      if (isHome) {
        dispatch({
          type: FEED_COMMENT_ADDED,
          payload: res.data.post
        });
        return;
      }

      dispatch({
        type: PROFILE_COMMENT_ADDED,
        payload: res.data.post
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_COMMENT_ERROR
      });
    });
  };
};