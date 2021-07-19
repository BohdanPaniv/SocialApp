import "./comments.scss";
import { TextField, Button } from "@material-ui/core";
import { useRef } from "react";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/actions/postsActions";
import { Link } from "react-router-dom";

const Comments = ({ user, post, isHome, index }) => {
  const comments = useSelector(state => isHome ? state.feedPosts.feed[index].comments : state.profilePosts.posts[index].comments);
  const comment = useRef();
  const path = process.env.REACT_APP_GET_FILE;
  const userProfileImage = user.profilePictureName? path + user.profilePictureName : "/assets/default-user.png";
  const userLink = `/profile/${user._id}`;
  const dispatch = useDispatch();

  const addUserComment = (event) => {
    event.preventDefault();

    if (!comment.current.value) {
      return;
    }

    const userComment = {
      userId: user._id,
      comment: comment.current.value,
      date: Date.now()
    };
    
    const postId = post._id;

    dispatch(addComment({ userComment, postId, isHome }));
    comment.current.value = null;
  }

  return (
    <div className="comments">
      <div className="comments-top">
        <form
            className="form-container"
            noValidate
            onSubmit={event => addUserComment(event)}
        >
          <Link
            to={userLink} 
            className="link"
          >
            <img
              src={userProfileImage}
              alt="error" 
              className="comments-icon"
            />
          </Link>
          <TextField
            id="filled-multiline-flexible"
            multiline
            variant="filled"
            label="Write a comment"
            inputRef={comment}
            className="form-input"
            size="small"
          />
          <Button
            variant="contained"
            className="add-btn"
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>
      <div className="comments-bottom">
        {comments.map((comment, index) => (
            <Comment key={index} user={user} comment={comment}/>
        ))}
      </div>
    </div>
  )
}

export default Comments;
