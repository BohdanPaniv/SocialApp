import "./profileRightBar.scss";
import { Button } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFollowing, removeFollowing } from "../../store/actions/userActions";

const ProfileRightBar = ({ user, owner }) => {
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();
  const ownerFollowers = `/contacts/${owner._id}/followers`;
  const ownerFollowing = `/contacts/${owner._id}/following`;
  const relationshipType = ["", "Single", "In a relationship", "Married"];

  const addFollowingHandle = () => {
    if (isFollow) {
      dispatch(removeFollowing({ user, owner }));
    }
    else {
      dispatch(addFollowing({ user, owner }));
    }

    setIsFollow(!isFollow);
  };

  useEffect(() => {
    const isMatch = user.following.find(item => item.userId === owner._id);

    if (isMatch) {
      setIsFollow(true);
    }
  }, [user, owner]);

  const FollowButton = () => {
    return(
      <Button 
        variant="contained"
        className="follow-btn"
        onClick={ addFollowingHandle }
      >
      {
        isFollow ?
        <>
          UnFollow <Remove />
        </>
        :
        <>
          Follow <Add/>
        </>
      }
      </Button>
    )
  };

  return(
    <div className="profile-right-bar">
      {
        owner._id !== user._id &&
        <FollowButton />
      }
      <h2 className="title">
          User information
      </h2>
      <div className="info">
        <div className="info-item">
          <span className="info-key">
            City:
          </span>
          <span className="info-value">
            { owner.city }
          </span>
        </div>
        <div className="info-item">
          <span className="info-key">
            From:
          </span>
          <span className="info-value">
            { owner.from }
          </span>
        </div>
        <div className="info-item">
          <span className="info-key">
            Relationship:
          </span>
          <span className="info-value">
            { relationshipType[owner.relationship]}
          </span>
        </div>
      </div>
      <div className="links">
        <Link to={ ownerFollowers } className="link">
          Followers { owner.followers.length }
        </Link>
        <Link to={ ownerFollowing } className="link">
            Following { owner.following.length }
        </Link>
      </div>
    </div> 
  )
}

export default ProfileRightBar;
