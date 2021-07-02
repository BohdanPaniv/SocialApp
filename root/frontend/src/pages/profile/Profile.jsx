import "./profile.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";

const Profile = () => {
  return (
    <div className="profile-page">
      <TopBar />
      <div className="profile-page-container">
        <SideBar />
        <div className="container-right">
          <div className="right-top">
            <div className="profile-cover">
              <img 
                src="/assets/lion.jpg"
                alt="" 
                className="cover-image"
              />
              <img 
                src="/assets/lion.jpg" 
                alt="" 
                className="profile-image" 
              />
            </div>
            <div className="profile-info">
              <h2 className="name">
                Ivan VANYA
              </h2>
              <span className="description">
                Hello my friends!
              </span>
            </div>
          </div>
          <div className="right-bottom">
            <Feed />
            <RightBar profile/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
