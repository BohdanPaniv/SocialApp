import "./contact.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Contact = ({ contact }) => {
  const ownerLink = `profile/${ contact.userId }`;
  const path = process.env.REACT_APP_GET_FILE;
  const contractInfo = `${contact?.name} ${contact?.surname}`;
  const defaultProfilePicture = "/assets/default-user.png";
  const [profilePictureName, setProfilePictureName] = useState(defaultProfilePicture);

  const setUserData = useCallback(() => {
    if (contact.profilePictureName) {
      setProfilePictureName(path + contact.profilePictureName);
    }
  }, [contact.profilePictureName, path]);

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  return (
    <li className="contact">
      <Link
        to={{ pathname: ownerLink }}
        className="link-container"
      >
        <div className="image-container">
          <img
            src={profilePictureName} 
            alt="error" 
            className="image"
          />
        </div>
        <span className="user-name">
          {contractInfo}
        </span>
      </Link>
    </li>
  );
};

export default Contact;
