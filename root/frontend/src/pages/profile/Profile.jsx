import "./profile.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../store/actions/authActions";

const Profile = () => {
  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const { id } = useParams();
  const ownerName = `${owner?.name} ${owner?.surname}`;
  const path = process.env.REACT_APP_GET_FILE;
  const defaultIcon = "/assets/default-user.png";
  const defaultBackground = "/assets/background.jpg";
  const userImageHref = user?.profilePicture ? path + user.profilePicture : defaultIcon;
  const ownerImageHref = owner?.profilePicture ? path + owner.profilePicture : defaultIcon;
  const backgroundHref = owner?.coverPicture ? path + owner.coverPicture : defaultBackground;

  useEffect(() => {
    const userInfo = {
      userId: id
    };

    const data = dispatch(getUser(userInfo));
    let isMount = true;
    
    data.then(res => {
      if (isMount) {
        setOwner(res.user);
      }
    });

    return () => {
      isMount = false;
    }
  }, [dispatch, id]);
  
  return (
      <div className="profile-page">
        <TopBar imageHref={ userImageHref }/>
        <div className="profile-page-container">
          <SideBar
            user={ user }
            imageHref={ userImageHref }
          />
          <div className="container-right">
            <div className="right-top">
              <div className="profile-cover">
                <img 
                  src={ backgroundHref }
                  alt="" 
                  className="cover-image"
                />
                <img 
                  src={ ownerImageHref }
                  alt="" 
                  className="profile-image" 
                />
              </div>
              <div className="profile-info">
                <h2 className="name">
                  { ownerName }
                </h2>
              </div>
            </div>
            <div className="right-bottom">
              {
                owner &&
                <>
                  <Feed
                    user={ user }
                    isHome={ true }
                    owner={ owner }
                  />
                  <RightBar profile />
                </>
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
