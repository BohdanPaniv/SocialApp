import "./post.scss";
import { ThumbUpAlt, ThumbUpAltOutlined } from "@material-ui/icons";
import { useState, useEffect, useCallback } from "react";
import Comments from "../comments/Comments";
import { useDispatch } from "react-redux";
import { addLike, removeLike } from "../../store/actions/postsActions";
import { Link } from "react-router-dom";
import { getComments } from "../../store/actions/postsActions";

const Post = ({ post, isHome, owner, feed, index, user }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [userName, setUserName] = useState();
  const [isReceivedComments, setIsReceivedComments] = useState(false);
  const defaultIcon = "/assets/default-user.png";
  const [profilePicture, setProfilePicture] = useState(defaultIcon);
  const dispatch = useDispatch();
  const path = process.env.REACT_APP_GET_FILE;
  const date = new Date(post.createdAt).toLocaleString();
  const ownerLink = `/profile/${post.userId}`;
  const commentCount = `${ post.comments.length } comment${ post.comments.length !== 1 ? "s" : "" }`;

  const likeHandler = () => {
    if (!isLiked) {
      setLike(like + 1);
      dispatch(addLike({ user, post, isHome }));
      return setIsLiked(!isLiked);
    }
    
    setLike(like - 1);
    dispatch(removeLike({ user, post, isHome }));
    setIsLiked(!isLiked);
  };

  const getPostComments = () => {
    if (isComments === false && isReceivedComments === false) {
      if (post.comments.length > 0) {
        const data = {
          post,
          isHome
        };
  
        dispatch(getComments(data));
        setIsReceivedComments(true);
      }
    }

    setIsComments(!isComments);
  };

  const setPostData = useCallback(() => {
    if (isHome) {
      if (post.userId === user._id) {
        const name = `${user.name} ${user.surname}`;
        setUserName(name);
        
        if (user.profilePictureName) {
          setProfilePicture(path + user.profilePictureName);
        }

        return;
      }

      if (post?.profilePictureName) {
        setProfilePicture(path + post.profilePictureName);
      }

      const name = `${post.userName} ${post.userSurname}`;
      return setUserName(name);
    }

    const name = `${owner.name} ${owner.surname}`;
    setUserName(name);

    if (owner?.profilePictureName) {
      setProfilePicture(path + owner.profilePictureName);
    }
  }, [isHome, post, owner, user._id, user.profilePictureName, path, user.name, user.surname]);

  const setLikeInfo = useCallback(() => {
    if (post.likes.length > 0) {
      const isMatch = post.likes.find(value => {
        return value.userId === user._id
      });
  
      if (isMatch) {
        setIsLiked(true);
      }
    }
  }, [post, user]);

  useEffect(() => {
    setLikeInfo();
  }, [setLikeInfo]);

  useEffect(() => {
    setPostData();
  }, [setPostData,setLikeInfo]);
  
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="top-left">
            <Link
              to={ownerLink}
              className="link-container">
                <img
                  src={profilePicture}
                  alt="error" 
                  className="post-icon"
                />
                <span className="user-name">
                  {userName}
                </span>
            </Link>
            <span className="date">
              {date}
            </span>
          </div>
        </div>
        <div className="post-center">
          <div className="post-text">
            <span>
              {post.description}
            </span>
          </div>
          {post.postImageName && (
            <img
              src={ path + post.postImageName }
              alt="error"
              className="image"
            />
          )}
        </div>
        <div className="post-bottom">
          <div className="bottom-left" onClick={likeHandler}>
            {isLiked ? (
              <ThumbUpAlt className="icon" />
            ) : ( 
              <ThumbUpAltOutlined className="icon" /> 
            )}
            <span className="like-counter">
              { like }
            </span>
          </div>
          <div className="bottom-right">
            <div
              className="comments-count"
              onClick={getPostComments}
            >
              {commentCount}
            </div>
          </div>
        </div>
        {isComments && (
          <Comments
            user={user}
            post={post}
            isHome={isHome}
            index={index}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
