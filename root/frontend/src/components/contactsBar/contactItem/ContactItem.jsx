import "./contactItem.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const ContactItem = ({ contact }) => {
  const path = process.env.REACT_APP_GET_FILE;
  const contractInfo = `${ contact.name } ${ contact.surname }`;
  const ownerLink = `/profile/${contact.userId}`;
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
    <Link
      className="contact-item" 
      to={ownerLink}
    >
      <img
        src={profilePictureName}
        alt="error"
        className="image"
      />
      <span className="contact-name">
        {contractInfo}
      </span>
    </Link>
  );
};

export default ContactItem;
