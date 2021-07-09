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
  const imageHref = user.profilePicture ? path + user.profilePicture : "/assets/default-user.png";
  const coverPictureHref = user.coverPicture ? path + user.coverPicture : "/assets/background.jpg";
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
        imageHref={ imageHref }
        user={ user }
      />
      <div className="settings-page-container">
        <SideBar
          user={ user } 
          imageHref={ imageHref }
        />
        <SettingsBar
          user={ user }
          imageHref={ imageHref }
          coverPictureHref={ coverPictureHref }
        />
      </div>
    </div>
  );
};

export default Settings;