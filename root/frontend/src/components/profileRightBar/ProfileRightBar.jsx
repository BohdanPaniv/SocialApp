import "./profileRightBar.scss";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
// import { useState } from "react";

const ProfileRightBar = () => {
  // const [isFollow, setIsFollow] = useState(false);

  const Follower = () => {
    return(
      <div className="follower">
        <img
          src="/assets/default-user.png"
          alt="error" 
          className="follower-image"
        />
        <span className="follower-name">
          John Cena
        </span>
      </div>
    );
  };

  return(
    <div className="profile-right-bar">
      <Button 
        variant="contained"
        className="follow-btn"
      >
        Follow <Add/>
      </Button>
      <h2 className="title">
          User information
      </h2>
      <div className="info">
        <div className="info-item">
          <span className="info-key">
            City:
          </span>
          <span className="info-value">
            New York
          </span>
        </div>
        <div className="info-item">
          <span className="info-key">
            From:
          </span>
          <span className="info-value">
            Lviv
          </span>
        </div>
        <div className="info-item">
          <span className="info-key">
            Relationship:
          </span>
          <span className="info-value">
            Single
          </span>
        </div>
      </div>
      <h2 className="title">
          Friends
      </h2>
      <div className="followers">
        <Follower />
        <Follower />
        <Follower />
        <Follower />
        <Follower />
        <Follower />
        <Follower />
      </div>
    </div> 
  )
}

export default ProfileRightBar;
