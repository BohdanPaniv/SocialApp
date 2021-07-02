import "./post.scss";
import { useSelector } from "react-redux";
import {
  MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLike, subtractLike } from "../../store/actions/userPostsActions";

const Post = ({ post }) => {
  const user = useSelector(store => store.auth.user);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const path = process.env.REACT_APP_GET_FILE;
  const date = new Date(post.createdAt).toLocaleString();
  const dispatch = useDispatch();

  const likeHandler = () => {
    if (!isLiked) {
      setLike(like + 1);
      setIsLiked(true);
      dispatch(addLike({ user, post }));
      return;
    }
    
    setLike(like - 1);
    setIsLiked(false);
    dispatch(subtractLike({ user, post }));
  }

  useEffect(() => {
    setLike(post.likes.length);
    const isMatch = post.likes.find(value => value.userId === user.id);

    if (isMatch) {
      setIsLiked(true);
    }
  }, [post, user]);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="top-left">
            <img
              src="/assets/lion.jpg"
              alt="error" 
              className="post-icon"
            />
            <span className="user-name">
              { user.name }
            </span>
            <span className="date">
              { date }
            </span>
          </div>
          <div className="top-right">
           <MoreVert className="options"/>
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">
            { post.description }
          </span>
          {
            post.imageName &&
            (
              <img
                src={ path + post.imageName}
                alt="error"
                className="image"
              />
            )
          }
        </div>
        <div className="post-bottom">
          <div className="bottom-left" onClick={ likeHandler }>
            {
              isLiked ?
              <ThumbUpAlt className="icon" />
              :
              <ThumbUpAltOutlined className="icon" />
            }
            <span className="like-counter">
              { like }
            </span>
          </div>
          <div className="bottom-right">
            <div className="comment-text">
              9 comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
