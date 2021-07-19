import "./Bookmarks.scss";
import TopBar from "../../components/topBar/TopBar";
import { useSelector } from 'react-redux';
import SideBar from "../../components/sideBar/SideBar";
import { useState, useEffect, useCallback } from "react";

const Bookmarks = () => {
  const user = useSelector(store => store.auth.user);
  const path = process.env.REACT_APP_GET_FILE;
  const defaultProfilePicture = "/assets/default-user.png";
  const [profilePictureName, setProfilePictureName] = useState(defaultProfilePicture);

  const setUserData = useCallback(() => {
    if (user.profilePictureName) {
      setProfilePictureName(path + user.profilePictureName);
    }
  }, [user.profilePictureName, path]);

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  
  return (
    <div className="bookmarks-page">
      <TopBar 
        profilePictureName={profilePictureName}
        user={user}
        owner={user}
        location="Home"
        search
      />
       <div className="bookmarks-page-container">
        <SideBar
          user={user} 
          profilePictureName={profilePictureName}
        />
      </div>
    </div>
  );
};

export default Bookmarks;
