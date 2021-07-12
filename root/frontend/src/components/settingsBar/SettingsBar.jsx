import { useState } from "react";
import "./settingsBar.scss";
import ChangeName from "./changeName/ChangeName";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { changePicture } from "../../store/actions/userActions";
import ChangePassword from "./changePassword/ChangePassword";
import ChangeUserInfo from "./changeUserInfo/ChangeUserInfo";

const SettingsBar = ({ user, imageHref, coverPictureHref }) => {
  const [isChangeName, setIsChangeName] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangeUserInfo, setIsChangeUserInfo] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [coverPicture, setCoverPicture] = useState();
  const relationshipType = ["", "Single", "In a relationship", "Married"];
  const dispatch = useDispatch();
  const userName = `${ user.name } ${ user.surname}`;
  const PROFILE = "PROFILE";
  const COVER = "COVER";

  const changeUserProfilePicture = () => {
    const data = {
      userId: user._id,
      image: profilePicture,
      oldImage: user.profilePicture
    };

    dispatch(changePicture({ data, type: PROFILE }));
    setProfilePicture(null);
  };

  const changeUserCoverPicture = () => {
    const data = {
      userId: user._id,
      image: coverPicture,
      oldImage: user.coverPicture
    };

    dispatch(changePicture({ data, type: COVER }));
    setCoverPicture(null);
  };

  const setImage = (event, key) => {
    event.preventDefault();

    switch (key) {
      case PROFILE:
        setProfilePicture(event.target.files[0]);
        break;
      case COVER:
        setCoverPicture(event.target.files[0]);
        break;
      default:
        break;
    }
    
    event.target.value= null;
  };

  return (
    <div className="settings-bar">
      <h2 className="title">
        Account Settings
      </h2>
      <div className="setting">
        <span className="name">
          Name
        </span>
        {
          isChangeName === false ?
          <div className="setting-container">
            <span className="value">
              { userName }
            </span>
            <span
              className="edit"
              onClick={() => setIsChangeName(true)}
            >
              Edit
            </span>
          </div>
          :
          <ChangeName
           user={ user }
           setIsChangeName={ setIsChangeName }
          />
        }
      </div>
      <div className="setting">
        <span className="name">
          Profile picture
        </span>
        <div className="setting-container">
          <div className="image-container">
            <img 
              src={ profilePicture ? URL.createObjectURL(profilePicture) : imageHref }
              alt="error"
              className="profile-picture"
            />
            {
              profilePicture &&
              <div cla="profile-picture-buttons">
                <Button
                  variant="contained" 
                  color="primary"
                  className="save-btn btn"
                  onClick={ changeUserProfilePicture }
                >
                  Save
                </Button>
                <Button
                  variant="contained" 
                  color="primary"
                  className="cancel-btn btn"
                  onClick={() => setProfilePicture(null) }
                >
                  Cancel
                </Button>
              </div>
            }
          </div>
          <label htmlFor="profile-picture">
            <span className="edit">
              Edit
            </span>
            <input
              type="file"
              className="file"
              id="profile-picture"
              accept=".png,.jpeg,.jpg"
              onChange={event => setImage(event, PROFILE)}
            />
          </label>
        </div>
      </div>
      <div className="setting">
        <span className="name">
          Cover picture
        </span>
        <div className="setting-container">
          <div className="image-container">
            <img 
              src={ coverPicture ? URL.createObjectURL(coverPicture) : coverPictureHref }
              alt="error"
              className="cover-picture"
            />
            {
              coverPicture &&
              <div cla="profile-picture-buttons">
                <Button
                  variant="contained" 
                  color="primary"
                  className="save-btn btn"
                  onClick={ changeUserCoverPicture }
                >
                  Save
                </Button>
                <Button
                  variant="contained" 
                  color="primary"
                  className="cancel-btn btn"
                  onClick={() => setCoverPicture(null)}
                >
                  Cancel
                </Button>
              </div>
            }
          </div>
          <label htmlFor="cover-picture">
            <span className="edit">
              Edit
            </span>
            <input
              type="file"
              className="file"
              id="cover-picture"
              accept=".png,.jpeg,.jpg"
              onChange={event => setImage(event, COVER)}
            />
          </label>
        </div>
      </div>
      <div className="setting">
        <span className="name">
          User info
        </span>
        {
          isChangeUserInfo === false ?
          <div className="setting-container">
            <div className="info-container">
              <span className="value">
                City: { user.city }
              </span>
              <span className="value info">
                From: { user.from }
              </span>
              <span className="value info">
                Relationship: { relationshipType[user.relationship] }
              </span>
            </div>
            <span
              className="edit"
              onClick={() => setIsChangeUserInfo(true)}
            >
              Edit
            </span>
          </div>
          :
          <ChangeUserInfo
           user={ user }
           setIsChangeUserInfo={ setIsChangeUserInfo }
          />
        }
      </div>
      <div className="setting">
        <span className="name">
          Password
        </span>
        {
          isChangePassword === false ?
          <span
            className="edit"
            onClick={() => setIsChangePassword(true)}
          >
            Edit
          </span>
          :
          <ChangePassword
           user={ user }
           setIsChangePassword={ setIsChangePassword }
          />
        }
      </div>
    </div>
  );
};

export default SettingsBar;
