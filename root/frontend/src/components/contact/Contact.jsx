import "./contact.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUser } from "../../store/actions/userActions";
import { Link } from "react-router-dom";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const path = process.env.REACT_APP_GET_FILE;
  const ownerLink = `profile/${contact.userId}`;
  const contractInfo = `${ owner?.name } ${ owner?.surname }`;
  const contactImageHref = owner ? path + owner.profilePicture : "/assets/default-user.png";

  useEffect(() => {
    const data = dispatch(getUser(contact));
    let isMount = true;

    data.then(res => {
      if (isMount) {
        setOwner(res.user);
      }
    });

    return () => {
      isMount = false;
    }
  }, [dispatch, contact]);

  return (
    <>
    {
      owner &&
      <li className="contact">
        <Link
          to={{
            pathname: ownerLink
          }}
          className="link-container"
        >
          <div className="image-container">
            <img
              src={ contactImageHref } 
              alt="error" 
              className="image"
            />
          </div>
          <span className="user-name">
            { contractInfo }
          </span>
        </Link>
    </li>
    }
    </>
  );
};

export default Contact;
