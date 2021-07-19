import "./profile.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMessage } from "../../hooks/useMessage";
import { getUser } from "../../store/actions/userActions";
import ProfileRightBar from "../../components/profileRightBar/ProfileRightBar";

const Profile = () => {
  const user = useSelector(store => store.auth.user);
  const message = useMessage();
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const response = useSelector(state => state.response);
  const { id } = useParams();
  const ownerName = owner && `${owner.name} ${owner.surname}`;
  const path = process.env.REACT_APP_GET_FILE;
  const defaultIcon = "/assets/default-user.png";
  const defaultBackground = "/assets/background.jpg";
  const profilePictureName = user?.profilePictureName ? path + user.profilePictureName : defaultIcon;
  const ownerImageHref = owner?.profilePictureName ? path + owner.profilePictureName : defaultIcon;
  const backgroundHref = owner?.coverPictureName ? path + owner.coverPictureName : defaultBackground;

  useEffect(() => {
    const userInfo = {
      userId: id
    };

    const data = dispatch(getUser(userInfo));
    let isMount = true;
    
    data.then(res => {
      if (isMount && res) {
        setOwner(res.user);
      }
    });

    return () => {
      isMount = false;
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);
  
  return (
    <div className="profile-page">
      <TopBar
        profilePictureName={profilePictureName}
        user={user}
        location="Profile"
        owner={owner}
        search
      />
      <div className="profile-page-container">
        <SideBar
          user={user}
          profilePictureName={profilePictureName}
        />
        <div className="container-right">
          <div className="right-top">
            <div className="profile-cover">
              <img 
                src={backgroundHref}
                alt="" 
                className="cover-image"
              />
              <img 
                src={ownerImageHref}
                alt="" 
                className="profile-image" 
              />
            </div>
            <div className="profile-info">
              <h2 className="name">
                {ownerName}
              </h2>
            </div>
          </div>
          <div className="right-bottom">
            {owner && (
              <>
                <Feed
                  user={user}
                  isHome={false}
                  owner={owner}
                  profilePictureName={profilePictureName}
                />
                <ProfileRightBar 
                  user={user}
                  owner={owner}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
