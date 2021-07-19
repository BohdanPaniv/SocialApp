import "./contact.scss";
import { Link } from "react-router-dom";

const Contact = ({ contact }) => {
  const ownerLink = `profile/${ contact.userId }`;
  const path = process.env.REACT_APP_GET_FILE;
  const contractInfo = `${contact?.name} ${contact?.surname}`;
  const contactImageHref = contact.profilePictureName ? path + contact.profilePictureName : "/assets/default-user.png";

  return (
    <li className="contact">
      <Link
        to={{ pathname: ownerLink }}
        className="link-container"
      >
        <div className="image-container">
          <img
            src={contactImageHref} 
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
