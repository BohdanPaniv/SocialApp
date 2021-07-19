import "./contactItem.scss";
import { Link } from "react-router-dom";

const ContactItem = ({ contact }) => {
  const path = process.env.REACT_APP_GET_FILE;
  const contractInfo = `${ contact.name } ${ contact.surname }`;
  const profilePictureName = contact.profilePictureName ? path + contact.profilePictureName : "/assets/default-user.png";
  const ownerLink = `/profile/${contact.userId}`;

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
