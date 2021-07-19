import "./settings.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import { useSelector } from 'react-redux';
import SettingsBar from "../../components/settingsBar/SettingsBar";
import { useMessage } from "../../hooks/useMessage";
import { useEffect } from "react";

const Settings = () => {
  const user = useSelector(store => store.auth.user);
  const path = process.env.REACT_APP_GET_FILE;
  const profilePictureName = user.profilePictureName ? path + user.profilePictureName : "/assets/default-user.png";
  const coverPictureHref = user.coverPictureName ? path + user.coverPictureName : "/assets/background.jpg";
  const message = useMessage();
  const response = useSelector(state => state.response);

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
          coverPictureHref={coverPictureHref}
        />
      </div>
    </div>
  );
};

export default Settings;