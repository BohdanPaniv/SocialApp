import "./settings.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import { useSelector } from 'react-redux';
import SettingsBar from "../../components/settingsBar/SettingsBar";
import { useMessage } from "../../hooks/useMessage";
import { useEffect, useState, useCallback } from "react";

const Settings = () => {
  const user = useSelector(store => store.auth.user);
  const message = useMessage();
  const response = useSelector(state => state.response);
  const path = process.env.REACT_APP_GET_FILE;
  const defaultBackground = "/assets/background.jpg";
  const defaultProfilePicture = "/assets/default-user.png";
  const [profilePictureName, setProfilePictureName] = useState(defaultProfilePicture);
  const [backgroundPictureName, setBackgroundPictureName] = useState(defaultBackground);

  const setUserData = useCallback(() => {
    if (user.profilePictureName) {
      setProfilePictureName(path + user.profilePictureName);
    }

    if (user.coverPictureName) {
      setBackgroundPictureName(path + user.coverPictureName);
    }
  }, [user.profilePictureName, path, user.coverPictureName]);

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  useEffect(() => {
    if (response.id){
      message(response);
    }
  }, [response, message]);

  return (
    <div className="settings-page">
      <TopBar
        profilePictureName={profilePictureName}
        user={user}
        location="Settings"
      />
      <div className="settings-page-container">
        <SideBar
          user={user} 
          profilePictureName={profilePictureName}
        />
        <SettingsBar
          user={user}
          profilePictureName={profilePictureName}
          coverPictureHref={backgroundPictureName}
        />
      </div>
    </div>
  );
};

export default Settings;