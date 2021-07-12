import "./contactItem.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUser } from "../../../store/actions/userActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const path = process.env.REACT_APP_GET_FILE;
  const contractInfo = `${ owner?.name } ${ owner?.surname }`;
  const contactImageHref = owner ? path + owner.profilePicture : "/assets/default-user.png";
  const ownerLink = owner && `/profile/${owner._id}`;

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
      owner ? 
      <Link
        className="contact-item" 
        to={ ownerLink }
      >
        <img
          src={ contactImageHref }
          alt="error"
          className="image"
        />
        <span className="contact-name">
          { contractInfo }
        </span>
      </Link>
      :
      <CircularProgress />
    }
    </>
  );
};

export default ContactItem;
