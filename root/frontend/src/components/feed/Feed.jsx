import "./feed.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { getFeed } from "../../store/actions/feedPostsActions";
import { getProfilePosts } from "../../store/actions/profilePostsActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = ({ user, isHome, owner }) => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feedPosts?.feed);
  const profileposts = useSelector(store => store.profilePosts?.posts);

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
        {
          owner._id === user._id &&
          <Share isHome={ isHome }/>
        }
        {
          isHome ?
          feed && feed.map(post => (
            <Post
              key={ post._id }
              post={ post }
              user={ user }
              isHome={ isHome }
            />
          ))
          :
          profileposts && profileposts.map(post => (
            <Post
              key={ post._id }
              post={ post }
              user={ user }
              isHome={ isHome }
            />
          ))
        }
      </div>
    </div>
  );
};

export default Feed;
