import "./post.scss";
import {
  // MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import Comments from "../comments/Comments";
import { useDispatch } from "react-redux";
import { addLike, removeLike } from "../../store/actions/postsActions";
import { getUser } from "../../store/actions/authActions";
import CircularProgress from '@material-ui/core/CircularProgress';

const Post = ({ post, user, isHome }) => {
  const [owner, setOwner] = useState();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const path = process.env.REACT_APP_GET_FILE;
  const date = new Date(post.createdAt).toLocaleString();
  const profileStartPath = process.env.REACT_APP_URL;
  const ownerLink = profileStartPath + `profile/${post.userId}`;
  const defaultIcon = "/assets/default-user.png";
  const imageHref = owner?.profilePicture ? path + owner.profilePicture : defaultIcon;
  const commentCount = `${ post.comments.length } comment${ post.comments.length !== 1 ? "s" : "" }`;

  const likeHandler = () => {
    if (!isLiked) {
      setLike(like + 1);
      dispatch(addLike({ user, post, isHome }));
      setIsLiked(!isLiked);
      return;
    }
    
    setLike(like - 1);
    dispatch(removeLike({ user, post, isHome }));
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    setLike(post.likes.length);
    const isMatch = post.likes.find(value => value.userId === user._id);

    if (isMatch) {
      setIsLiked(true);
    }
  }, [post, user]);

  useEffect(() => {
    let isMount = true;
    const data = dispatch(getUser(post));

    data.then(res => {
      if (isMount) {
        setOwner(res.user);
      }
    });

    return () => {
      isMount = false;
    }
  }, [dispatch, post]);

  return (
    <>
    {
      owner ? 
        <div className="post">
          <div className="post-wrapper">
            <div className="post-top">
              <div className="top-left">
                <a 
                  href={ ownerLink }
                  className="link-container">
                  <img
                    src={ imageHref }
                    alt="error" 
                    className="post-icon"
                  />
                  <span className="user-name">
                    { `${owner?.name} ${owner?.surname}` }
                  </span>
                </a>
                <span className="date">
                    { date }
                  </span>
              </div>
              {/* <div className="top-right">
              <MoreVert className="options"/>
              </div> */}
            </div>
            <div className="post-center">
              <div className="post-text">
                <span>
                  { post.description }
                </span>
              </div>
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
                <div
                  className="comments-count"
                  onClick={() => setIsComments(!isComments)}
                >
                  { commentCount }
                </div>
              </div>
            </div>
            {
              isComments && 
              <Comments
                user={ user }
                post={ post }
                isHome
              />
            }
          </div>
        </div>
      :
      <CircularProgress />
    }
    </>
  );
};

export default Post;
