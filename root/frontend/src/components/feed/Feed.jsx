import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { getFeed } from "../../store/actions/feedPostsActions";
import { getProfilePosts } from "../../store/actions/profilePostsActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = ({ user, isHome, owner, profilePictureName }) => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feedPosts?.feed);
  const profilePosts = useSelector(store => store.profilePosts?.posts);

  useEffect(() => {
    if (isHome) {
      return dispatch(getFeed(owner));
    }

    if (user._id === owner._id) {
      return dispatch(getProfilePosts(user));
    }

    return dispatch(getProfilePosts(owner));
  }, [dispatch, user, owner, isHome]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {owner._id === user._id && (
          <Share
            isHome={ isHome }
            profilePictureName={ profilePictureName }
          />
        )}
        {isHome ?
          feed && feed.map((post, index) => (
            <Post
              key={ post._id }
              index={ index }
              post={ post }
              user={ user }
              isHome={ isHome }
            />
          ))
          :
          profilePosts && profilePosts.map((post, index) => (
            <Post
              key={ post._id }
              index={ index }
              post={ post }
              user={ user }
              owner={ owner }
              isHome={ isHome }
            />
          ))
        }
      </div>
    </div>
  );
};

export default Feed;
