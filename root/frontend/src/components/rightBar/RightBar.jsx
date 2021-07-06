import "./rightBar.scss";
import HomeRightBar from "../homeRightBar/HomeRightBar";
import ProfileRightBar from "../profileRightBar/ProfileRightBar";

const RightBar = ({ profile }) => {

  return (
    <div className="right-bar">
      <div className="right-bar-wrapper">
        {
          profile ?
          <ProfileRightBar />
          :
          <HomeRightBar />
        }
      </div>
    </div>
  );
};

export default RightBar;
